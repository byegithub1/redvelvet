'use client'

import Link from 'next/link'
import LanguageSwitcher from '@/components/layouts/language-switcher'

import { useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import { HomeOutlined, EditOutlined, CoffeeOutlined } from '@ant-design/icons'

const Navigation = () => {
  const localeActive = useLocale()
  const currentPath = usePathname().split('/').pop()
  const navItems = [
    { path: `/${localeActive}`, icon: <HomeOutlined />, title: 'Home' },
    { path: `/${localeActive}/write`, icon: <EditOutlined />, title: 'Write' },
    { path: `/${localeActive}/buy-me-a-coffee`, icon: <CoffeeOutlined />, title: 'Buy Me a Coffee' }
  ]

  return (
    <nav className="navigation-wrapper">
      {navItems.map((item) => (
        <Link
          key={item.path}
          className={`no-print item ${
            (!currentPath && item.path === `/${localeActive}`) || currentPath === item.path.split('/').pop()
              ? 'item--active'
              : ''
          }`}
          title={item.title}
          href={item.path}
        >
          {item.icon}
        </Link>
      ))}
      <LanguageSwitcher />
    </nav>
  )
}

export default Navigation
