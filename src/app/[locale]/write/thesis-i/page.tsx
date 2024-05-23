'use client'

import Container from '@/components/layouts/container'
import Notification from '@/components/elements/notification'

import xmrseed from '@/components/default/seed/xmr/xmrseed'

import { Button, Input } from 'antd'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { ReloadOutlined } from '@ant-design/icons'
import { notFound, usePathname } from 'next/navigation'
import { _instance } from '@/helpers/_functions/interceptor'

const ThesisI = () => {
  const redL = useTranslations('Write')
  const currentPath = usePathname().split('/').pop()
  const papers = redL.raw('contents.papers')
  const paper = papers.find((paper: any) => paper.path.split('/').pop() === currentPath)

  const header = { title: paper.title, subtitle: paper.subtitle, noprint: paper.noprint }

  const [signWords, setSignWords] = useState('')
  const [signature, setSignature] = useState('')
  const [signed, setSigned] = useState(false)

  const handleRefresh = () => {
    const shuffle = () => xmrseed[Math.round(Math.random() * 1627)]
    setSignWords(`${shuffle()}-${shuffle()}-${shuffle()}-${Date.now()}`)
    setSignature('')
  }

  useEffect(() => handleRefresh(), [])

  if (!paper) return notFound()
  return (
    <Container header={header}>
      <main className="paper-thesis">
        <p className="warning-paragraph">{paper.warning}</p>
        <div className="content-section">
          {!signed && (
            <>
              <div className="signature-wrapper mb-4">
                <h1>{paper.incomplete}</h1>
                <p>{paper.incomplete_content}</p>
                <pre>{signWords}</pre>
                <Input
                  className="paragraph mt-4"
                  size="small"
                  placeholder="ed25519"
                  prefix={<div className="paragraph !font-semibold">{paper.signature}:</div>}
                  value={signature}
                  onChange={(event) => setSignature(event.target.value)}
                />
                <Button
                  className="mt-2 mr-1.5"
                  type="default"
                  size="small"
                  icon={<ReloadOutlined />}
                  onClick={handleRefresh}
                />
                <Notification
                  name={paper.verify}
                  type="warning"
                  placement="bottomLeft"
                  message={paper.notification.title}
                  description={paper.notification.content}
                />
              </div>
              <hr />
            </>
          )}
        </div>
      </main>
    </Container>
  )
}

export default ThesisI
