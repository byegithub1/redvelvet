'use client'

import Container from '@/components/layouts/container'

import Image from 'next/image'

import KeyLogo from '@/assets/svg/noun-keys-3554261.svg'
import PublicKeys from '@/app/[locale]/(home)/public-keys'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

const Home = () => {
  const redL = useTranslations('Home')
  const header = {
    title: redL('title'),
    subtitle: '',
    noprint: { title: false, subtitle: false }
  }
  const [showPublicKeys, setShowPublicKeys] = useState(false)

  return (
    <Container header={header}>
      <main className="home">
        <p>
          {redL('contents.s1')}&nbsp;
          <a href="mailto:re@redvelvet.me">re@redvelvet.me</a> or&nbsp;
          <a href="mailto:rasetiansyah@pm.me">rasetiansyah@pm.me</a> {redL('contents.s2')}&nbsp;
          <a href="xmpp:redvelvet@danwin1210.de">XMPP</a>.
        </p>
        <div className="regard">
          <em>{redL('contents.s3')}</em>
          <div className="key-button" onClick={() => setShowPublicKeys((prevState) => !prevState)}>
            <Image src={KeyLogo} alt="PubKeys" priority={false} />
          </div>
        </div>
        {showPublicKeys && <PublicKeys />}
      </main>
    </Container>
  )
}

export default Home
