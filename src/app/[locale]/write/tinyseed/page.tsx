'use client'

import Container from '@/components/layouts/container'

import { useTranslations } from 'next-intl'
import { notFound, usePathname } from 'next/navigation'

import xmrseed from '@/components/default/seed/xmr/xmrseed'
import bip39seed from '@/components/default/seed/bip39/bip39seed'
import slip39seed from '@/components/default/seed/slip39/slip39seed'

import { Button, Input } from 'antd'
import { useEffect, useState } from 'react'

const TinySeed = () => {
  const redL = useTranslations('Write')
  const currentPath = usePathname().split('/').pop()
  const papers = redL.raw('contents.papers')
  const paper = papers.find((paper: any) => paper.path.split('/').pop() === currentPath)

  const [read, setRead] = useState<boolean>(false)
  const [proposal, setProposal] = useState<string>('')
  const [seedData, setSeedData] = useState<Array<string>>([])
  const [indexesMode, setIndexesMode] = useState<boolean>(false)
  const [inputValues, setInputValues] = useState<Array<string>>(Array(0).fill(''))

  const header = { title: paper.title, subtitle: paper.subtitle, noprint: paper.noprint }

  const totalizer: Array<number> = [2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1]
  const Seed = (proposal: string): Array<string> => {
    switch (proposal) {
      case 'bip-39':
        return bip39seed
      case 'slip-39':
        return slip39seed
      case 'xmr':
        return xmrseed
      default:
        return []
    }
  }
  const maxIndex =
    {
      'bip-39': 2048,
      'slip-39': 1024,
      xmr: 1626
    }[proposal] || Infinity
  const proposalButtons = [
    { key: 'bip-39', label: 'BIP-39' },
    { key: 'slip-39', label: 'SLIP-39' },
    { key: 'xmr', label: 'XMR' }
  ]

  useEffect(() => {
    setSeedData(Seed(proposal))
  }, [proposal])

  const handleInputChange = (row: number, col: number, value: string) => {
    const trimmedValue = value.trim()
    const isValidInput = !indexesMode
      ? /^[A-Za-z]+$/.test(trimmedValue)
      : /^\d+$/.test(trimmedValue) && parseInt(trimmedValue, 10) <= maxIndex && parseInt(trimmedValue, 10) > 0
    const inputIndex = (row - 1) * 4 + col - 1

    if (isValidInput && inputValues.length <= inputIndex) {
      setInputValues((prevInputValues) => {
        const newInputValues = [...prevInputValues]

        for (let i = prevInputValues.length; i <= inputIndex; i++) newInputValues[i] = ''

        newInputValues[inputIndex] = trimmedValue.toLowerCase()
        return newInputValues
      })
    } else if (isValidInput || trimmedValue === '') {
      setInputValues((prevInputValues) => {
        const newInputValues = [...prevInputValues]
        newInputValues[inputIndex] = trimmedValue.toLowerCase()
        return newInputValues
      })
    }
  }

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>): any => {
    event.preventDefault()
    const pastedText = event.clipboardData.getData('text/plain')
    const words = pastedText.toLowerCase().replace(/,/g, '').split(/\s+/)
    const validWords = words
      .map((word: string) => word.trim())
      .filter((word: string) => {
        if (!indexesMode) {
          return /^[A-Za-z]+$/.test(word)
        } else {
          const isNumeric = /^\d+$/.test(word)
          const isInRange = isNumeric && parseInt(word, 10) <= maxIndex && parseInt(word, 10) > 0
          return isInRange
        }
      })

    setInputValues(validWords)
  }

  const renderSeedRows = () =>
    Array.from({ length: 6 }, (_, i) => (
      <div key={i} className="no-print seed-rows">
        {Array.from({ length: 4 }, (_, j) => {
          const inputKey = i * 4 + j + 1
          return (
            <Input
              key={inputKey}
              className="paragraph mx-2.5"
              size="small"
              placeholder="???"
              prefix={
                <div className={`paragraph !font-semibold ${inputKey.toString().length < 2 && 'mr-1.5'}`}>
                  {inputKey}.
                </div>
              }
              value={inputValues[inputKey - 1] || ''}
              onChange={(event) => handleInputChange(i + 1, j + 1, event.target.value)}
              onPaste={handlePaste}
            />
          )
        })}
      </div>
    ))

  if (!paper) return notFound()
  return (
    <Container header={header}>
      <main className="paper-tinyseed">
        <p className="no-print warning-paragraph">{paper.warning}</p>
        <div className="content-section">
          {!read ? (
            <span className="no-print readmore-button" onClick={() => setRead(!read)}>
              {paper.buttons.read_more}...
            </span>
          ) : (
            <div>
              <span className="no-print readmore-button" onClick={() => setRead(!read)}>
                {paper.buttons.close}
              </span>
              <p className="no-print content-margin">
                {paper.pre_content}
                <a href={paper.official_tinyseed_url.link} target="_blank" rel="noopener noreferrer nofollow">
                  {paper.official_tinyseed_url.label}
                </a>
                {paper.content}
              </p>
              <div className="seed-selector">
                <span className="no-print">{paper.choose_proposal}&nbsp;&nbsp;</span>
                {proposalButtons.map(
                  (button) =>
                    proposal !== button.key && (
                      <Button
                        className="no-print"
                        key={button.key}
                        type="default"
                        size="small"
                        onClick={() => setProposal(button.key)}
                      >
                        {button.label}
                      </Button>
                    )
                )}
                <h1 className="no-print">
                  {proposal.toUpperCase()} -&nbsp;
                  {!indexesMode
                    ? paper.buttons.words.charAt(0).toUpperCase() + paper.buttons.words.slice(1)
                    : paper.buttons.indexes.charAt(0).toUpperCase() + paper.buttons.indexes.slice(1)}
                </h1>
                <p className="no-print">
                  {paper.parts.use.charAt(0).toUpperCase() + paper.parts.use.slice(1)}&nbsp;
                  <span
                    className="indexes-mode"
                    onClick={() => {
                      setInputValues(Array(0).fill(''))
                      setIndexesMode(!indexesMode)
                    }}
                  >
                    {indexesMode ? paper.buttons.words : paper.buttons.indexes}
                  </span>
                  &nbsp;{paper.parts.instead}
                </p>
                {seedData.length > 0 && (
                  <div className="no-print wrapper-seed-rows">
                    {renderSeedRows()}
                    <div className="wrapper-input">
                      <Input
                        className="paragraph mx-2.5"
                        size="small"
                        placeholder="opt."
                        prefix={<div className="paragraph !font-semibold">25.</div>}
                        value={inputValues[25 - 1] || ''}
                        onChange={(event) => handleInputChange(7, 1, event.target.value)}
                        onPaste={handlePaste}
                      />
                    </div>
                  </div>
                )}
                <div className="wrapper-table">
                  <table>
                    <thead className="no-print">
                      <tr>
                        <th></th>
                        {totalizer.map((number, index) => (
                          <th key={index}>
                            <b>{number}</b>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {inputValues.map((word: any, rowIndex: number) => {
                        let total = 0
                        let addedNumbers = []

                        return (
                          <tr key={rowIndex}>
                            <td className="no-print td-words">
                              <p>{(!indexesMode ? seedData.indexOf(word) + 1 : seedData[word - 1]) || '-'}</p>
                            </td>
                            {totalizer.map((numItem, colIndex) => {
                              const currentWordIndex = indexesMode ? word : seedData.indexOf(word) + 1
                              if (currentWordIndex >= numItem && total + numItem <= currentWordIndex) {
                                total += numItem
                                addedNumbers.push(numItem)
                                return (
                                  <td key={colIndex} className="td-x">
                                    <p>x</p>
                                  </td>
                                )
                              } else {
                                return (
                                  <td key={colIndex} className="td-strip">
                                    <p>-</p>
                                  </td>
                                )
                              }
                            })}
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
                {proposal && <p className="no-print info-paragraph">{paper.sub_content}</p>}
              </div>
            </div>
          )}
        </div>
      </main>
    </Container>
  )
}

export default TinySeed
