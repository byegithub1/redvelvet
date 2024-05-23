'use client'

import Container from '@/components/layouts/container'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { notFound, usePathname } from 'next/navigation'

const PerspectiveOfComputerScience = () => {
  const redL = useTranslations('Write')
  const currentPath = usePathname().split('/').pop()
  const papers = redL.raw('contents.papers')
  const paper = papers.find((paper: any) => paper.path.split('/').pop() === currentPath)

  const [read, setRead] = useState(false)

  if (!paper) return notFound()

  const header = { title: paper.title, subtitle: paper.subtitle, noprint: paper.noprint }

  return (
    <Container header={header}>
      <main className="paper-perspective-of-computer-science">
        <p className="warning-paragraph">{paper.warning}</p>
        <div className="content-section">
          {!read ? (
            <span className="readmore-button" onClick={() => setRead(!read)}>
              {paper.buttons.read_more}...
            </span>
          ) : (
            <div>
              <span className="readmore-button" onClick={() => setRead(!read)}>
                {paper.buttons.close}
              </span>
              <p className="content-margin">{paper.content}</p>
              <p className="info-paragraph">{paper.resolution.title}</p>
              <p className="content-margin">{paper.resolution.content}</p>
            </div>
          )}
        </div>
      </main>
    </Container>
  )
}

export default PerspectiveOfComputerScience
