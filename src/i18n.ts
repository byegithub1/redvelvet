'use server'

import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'

// Can be imported from a shared config
const country = ['de', 'en', 'fr', 'id', 'jp', 'ru']

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!country.includes(locale as any)) notFound()
  return { messages: (await import(`@/language/${locale}.json`)).default }
})
