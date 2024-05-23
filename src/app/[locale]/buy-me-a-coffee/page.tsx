'use client'

import Container from '@/components/layouts/container'

import { QRCode, Space } from 'antd'
import { useTranslations } from 'next-intl'

const BuyMeACoffee = () => {
  const redL = useTranslations('BuyMeACoffee')
  const header = {
    title: redL('title'),
    subtitle: redL('subtitle'),
    noprint: { title: false, subtitle: false }
  }
  const evmAddress = process.env.NEXT_PUBLIC_ETHEREUM_ADDRESS
  const compatibleNetworksLink = 'https://www.google.com/search?q=All+EVM-compatible+networks'

  return (
    <Container header={header}>
      <main className="buy-me-a-coffee">
        <div>
          {evmAddress && (
            <div className="qrcode">
              <Space direction="vertical" align="center" className="space">
                <QRCode type="canvas" value={evmAddress} errorLevel="H" />
              </Space>
              <b>
                {redL(`contents.s1`)}
                <a href={compatibleNetworksLink} target="_blank" rel="noopener noreferrer nofollow">
                  {redL(`contents.s2`)}
                </a>
                <br />
                <span>
                  <pre className="pre">{evmAddress}</pre>
                </span>
              </b>
            </div>
          )}
        </div>
      </main>
    </Container>
  )
}

export default BuyMeACoffee
