import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
	/*
	 * Serverside Environment variables, not available on the client.
	 * Will throw if you access these variables on the client.
	 */
	server: {
		NODE_ENV: z.enum(['development', 'test', 'production']),

		BREVO_API_KEY: z.string().nonempty(),

		BREVO_LIST_ID_FOR_JOIN_WAITLIST: z
			.string()
			.nonempty()
			.transform(Number)
			.refine((v) => v > 0),

		BREVO_TEMPLATE_ID_FOR_JOIN_WAITLIST: z
			.string()
			.nonempty()
			.transform(Number)
			.refine((v) => v > 0),

		CLERK_SECRET_KEY: z.string().nonempty(),
	},
	/*
	 * Environment variables available on the client (and server).
	 *
	 * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
	 */
	client: {
		NEXT_PUBLIC_APP_URL: z.string().url(),
		NEXT_PUBLIC_API_URL: z.string().url(),
		NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().nonempty(),
		NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string().nonempty(),
		NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string().nonempty(),
		NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: z.string().nonempty(),
		NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: z.string().nonempty(),
		NEXT_PUBLIC_BROADCAST_URL: z.string().startsWith('ws'),
	},
	/*
	 * Due to how Next.js bundles environment variables on Edge and Client,
	 * we need to manually destructure them to make sure all are included in bundle.
	 *
	 * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
	 */
	runtimeEnv: {
		NODE_ENV: process.env.NODE_ENV,

		NEXT_PUBLIC_APP_URL:
			process.env.NEXT_PUBLIC_APP_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined),

		NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,

		BREVO_API_KEY: process.env.BREVO_API_KEY,

		BREVO_LIST_ID_FOR_JOIN_WAITLIST: process.env.BREVO_LIST_ID_FOR_JOIN_WAITLIST,

		BREVO_TEMPLATE_ID_FOR_JOIN_WAITLIST: process.env.BREVO_TEMPLATE_ID_FOR_JOIN_WAITLIST,

		NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
		CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
		NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
		NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
		NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL,
		NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL,
		NEXT_PUBLIC_BROADCAST_URL: process.env.NEXT_PUBLIC_BROADCAST_URL,
	},
})
