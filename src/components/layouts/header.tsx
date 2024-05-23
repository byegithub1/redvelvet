'use client'

import Image from 'next/image'

import RedVelvet from '@/assets/png/redvelvet.png'
import Navigation from '@/components/layouts/navigation'

type Props = {
  title: string
  subtitle: string
  noprint: {
    title: boolean
    subtitle: boolean
  }
}

const Header = ({ title, subtitle, noprint }: Props) => {
  return (
    <div className="header-wrapper">
      <Image src={RedVelvet} alt="RedVelvet" priority={true} />
      <Navigation />
      <h1>{title}</h1>
      <h3 className={`${noprint?.title && 'no-print'}`}>
        <a href="mailto:re@redvelvet.me">Rivane Rasetiansyah</a>
        {subtitle && (
          <span className={`${noprint?.title && 'no-print'}`}>
            <br />
            {subtitle}
          </span>
        )}
      </h3>
    </div>
  )
}

export default Header
