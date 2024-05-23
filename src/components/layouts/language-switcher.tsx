'use client'

import { useLocale } from 'next-intl'
import { useTransition, ChangeEvent } from 'react'
import { useRouter, usePathname } from 'next/navigation'

const LanguageSwitcher = () => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const pathname = usePathname()
  const localeActive = useLocale()

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    startTransition(() => router.replace(pathname.replace(localeActive, `${event.target.value}`)))
  }

  return (
    <select
      onChange={handleChange}
      defaultValue={localeActive}
      disabled={isPending}
      className="language-switcher no-print"
    >
      <option value="en">EN</option>
      <option value="de">DE</option>
      <option value="fr">FR</option>
      <option value="id">ID</option>
      <option value="jp">JP</option>
      <option value="ru">RU</option>
    </select>
  )
}

export default LanguageSwitcher
