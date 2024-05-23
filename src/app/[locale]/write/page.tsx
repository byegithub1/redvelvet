'use client'

import Container from '@/components/layouts/container'

import Link from 'next/link'

import { useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'

const Write = () => {
  const redL = useTranslations('Write')
  const localeActive = useLocale()
  const header = {
    title: redL('title'),
    subtitle: redL('subtitle'),
    noprint: { title: false, subtitle: false }
  }
  const papers = redL.raw('contents.papers')
  const [isLatestFirst, setIsLatestFirst] = useState(false)
  const handleReverse = () => setIsLatestFirst(!isLatestFirst)
  const latestPapers = isLatestFirst ? papers.slice().reverse() : papers

  return (
    <Container header={header}>
      <div className="write">
        <div className="button-wrapper">
          <button className="button-pinned">{redL('components.pinned')}</button>
        </div>
        {papers.map(
          (paper: any, index: number) =>
            paper.pinned && (
              <Link key={index} href={`/${localeActive}${paper.path}`}>
                <h2 className="title">{paper.title}</h2>
                <h2 className="date">{paper.date}</h2>
              </Link>
            )
        )}
      </div>
      <main className="write">
        <div className="button-wrapper">
          <button className="button-sort" onClick={handleReverse}>
            {isLatestFirst ? redL('components.oldest') : redL('components.latest')}
          </button>
        </div>
        <hr />
        {latestPapers.map((paper: any, index: number) => (
          <Link key={index} href={`/${localeActive}${paper.path}`}>
            <h2 className="title">{paper.title}</h2>
            <h2 className="date">{paper.date}</h2>
          </Link>
        ))}
      </main>
    </Container>
  )
}

export default Write
