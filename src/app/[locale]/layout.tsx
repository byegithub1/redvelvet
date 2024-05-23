import type { Metadata } from 'next'

import ReduxProvider from '@/provider/redux/provider'
import AntdProvider from '@/provider/antd/provider'

import { Inter } from 'next/font/google'
import { getMessages } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'redvelvet.me',
    template: '%s | redvelvet.me'
  },
  description: 'Rivane Rasetiansyah',
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/icon/favicon.ico',
        href: '/icon/favicon.ico'
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/icon/favicon.ico',
        href: '/icon/favicon.ico'
      }
    ]
  }
}

const LocaleLayout = async ({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) => {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <ReduxProvider>
          <NextIntlClientProvider messages={messages}>
            <AntdProvider>{children}</AntdProvider>
          </NextIntlClientProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}

export default LocaleLayout
