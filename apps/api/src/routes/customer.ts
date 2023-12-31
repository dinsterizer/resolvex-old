import { customers } from '../schema'
import { customerIdColumnSchema } from '../schema.customer'
import { orgedProcedure, router } from '../trpc'
import { TRPCError } from '@trpc/server'
import { and, eq, sql } from 'drizzle-orm'
import { z } from 'zod'

export const customer = router({
	list: orgedProcedure
		.input(
			z.object({
				limit: z.number().min(1).max(20).default(10),
				cursor: z.number().min(0).default(0),
				status: z.enum(customers.status.enumValues).optional(),
				orderBy: z.enum(['-createdAt', '+createdAt']).default('+createdAt'),
			}),
		)
		.query(async ({ input, ctx }) => {
			const { db, auth } = ctx
			const { limit, cursor, status, orderBy } = input

			const data = await db.query.customers.findMany({
				where: (t, { eq, and }) => and(eq(t.orgId, auth.org_id), status && eq(t.status, status)),
				columns: { id: true, name: true, email: true, createdAt: true },
				limit,
				offset: cursor,
				orderBy: (t, { desc, asc }) => (orderBy === '-createdAt' ? desc(t.createdAt) : asc(t.createdAt)),
				with: {
					timelines: {
						columns: {
							id: true,
							createdAt: true,
							data: true,
						},
						limit: 1,
						orderBy: (t, { desc }) => desc(t.createdAt),
					},
				},
			})

			const meta = await db
				.select({
					count: sql<number>`count(*)`,
				})
				.from(customers)
				.where(and(eq(customers.orgId, auth.org_id), status && eq(customers.status, status)))
				.get()

			return {
				data,
				meta: {
					nextCursor: cursor + limit < meta.count ? cursor + limit : undefined,
				},
			}
		}),

	detail: orgedProcedure.input(z.object({ id: customerIdColumnSchema })).query(async ({ input, ctx }) => {
		const { db } = ctx
		const { id } = input

		const data = await db.query.customers.findFirst({
			where: (t, { eq, and }) => and(eq(t.id, id), eq(t.orgId, ctx.auth.org_id)),
			columns: {
				id: true,
				name: true,
				email: true,
				status: true,
			},
		})

		if (!data) {
			throw new TRPCError({
				code: 'NOT_FOUND',
			})
		}

		return data
	}),
})
