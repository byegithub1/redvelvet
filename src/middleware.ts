'use server'

import createMiddleware from 'next-intl/middleware'

const countries = ['de', 'en', 'fr', 'id', 'jp', 'ru']

export default createMiddleware({
  // A list of all locales that are supported
  locales: countries,
  localeDetection: true,
  localePrefix: 'always',
  // Used when no locale matches
  defaultLocale: 'en',
  // Optionally restrict the locales available on this domain
  domains: []
})

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(de|en|fr|id|jp|ru)/:path*']
}
