import './globals.css'
import React from 'react'
import { Space_Grotesk, Open_Sans } from 'next/font/google'
import { cn } from '~/lib/utils'
import { Header } from '~/components/header'
import { ScrollArea } from '~/components/ui/scroll-area'
import { Footer } from '~/components/footer'
import { env } from '~/env'
import { Toaster } from '~/components/ui/toaster'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['500'],
})

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
})

export const metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: {
    default: 'ResolveX | Your support center',
    template: '%s | ResolveX',
  },
  description:
    'We bring the simple and powerful to your support center. Help you support your customers by all over the channels by the power of .ai',
  keywords: [
    'dilee',
    'dileedotdev',
    'resolveX',
    'resolvexai',
    'resolvexdotai',
    'resolve',
    'support',
    'support center',
    'customer support',
    'customer service',
    'customer success',
    'customer experience',
    'customer support software',
    'customer service software',
    'customer success software',
    'customer experience software',
    'customer support platform',
    'customer service platform',
    'customer success platform',
    'customer experience platform',
    'customer support tool',
    'customer service tool',
    'customer success tool',
    'customer experience tool',
    'customer support solution',
    'customer service solution',
    'customer success solution',
    'customer experience solution',
    'customer support system',
    'customer service system',
    'customer success system',
    'customer experience system',
    'customer support app',
    'customer service app',
    'customer success app',
    'customer experience app',
    'customer support application',
    'customer service application',
    'customer success application',
    'customer experience application',
    'customer support software as a service',
    'customer service software as a service',
    'customer success software as a service',
    'customer experience software as a service',
    'customer support platform as a service',
    'customer service platform as a service',
    'customer success platform as a service',
    'customer experience platform as a service',
    'customer support tool as a service',
    'customer service tool as a service',
    'customer success tool as a service',
    'customer experience tool as a service',
    'customer support solution as a service',
    'customer service solution as a service',
    'customer success solution as a service',
    'customer experience solution as a service',
    'customer support system as a service',
    'customer service system as a service',
    'customer success system as a service',
    'customer experience system as a service',
    'customer support app as a service',
  ],
  openGraph: {
    title: 'ResolveX | Your support center',
    description:
      'We bring the simple and powerful to your support center. Help you support your customers by all over the channels by the power of .ai',
    url: env.NEXT_PUBLIC_APP_URL,
    siteName: 'ResolveX',
    locale: 'en-US',
    type: 'website',
  },
  twitter: {
    title: 'ResolveX | Your support center',
    card: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={cn([
          spaceGrotesk.variable,
          openSans.variable,
          'dark font-sans',
          env.NODE_ENV === 'development' ? 'debug-screens' : '',
        ])}
      >
        <ScrollArea className="h-screen w-screen">
          <Header className="container py-7" />
          {children}
          <Footer className="container pb-10 pt-36" />
        </ScrollArea>

        <Toaster />
      </body>
    </html>
  )
}
