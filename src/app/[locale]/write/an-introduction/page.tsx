'use client'

import Container from '@/components/layouts/container'

import Image from 'next/image'

import { Avatar, Card } from 'antd'
import { useTranslations } from 'next-intl'
import { notFound, usePathname } from 'next/navigation'
import { GithubOutlined, GitlabOutlined, DockerOutlined, LinkedinOutlined } from '@ant-design/icons'

import avatar from '@/assets/jpg/avatar_default_1-20230707-0001.jpg'
import photo from '@/assets/jpg/avatar_default_1-20230707-0002.jpg'

const { Meta } = Card

const AnIntroductionPaper = () => {
  const redL = useTranslations('Write')
  const currentPath = usePathname().split('/').pop()
  const papers = redL.raw('contents.papers')
  const paper = papers.find((paper: any) => paper.path.split('/').pop() === currentPath)

  if (!paper) return notFound()

  const header = { title: paper.title, subtitle: paper.subtitle, noprint: paper.noprint }

  const actions = Object.entries({
    github: { url: paper.social_links.github, icon: <GithubOutlined /> },
    gitlab: { url: paper.social_links.gitlab, icon: <GitlabOutlined /> },
    docker: { url: paper.social_links.docker, icon: <DockerOutlined /> },
    linkedin: { url: paper.social_links.linkedin, icon: <LinkedinOutlined /> }
  }).map(
    ([key, { url, icon }]) =>
      url && (
        <a key={key} href={url} target="_blank" rel="noopener noreferrer nofollow">
          {icon}
        </a>
      )
  )

  return (
    <Container header={header}>
      <main className="paper-an-introduction">
        <Card
          className="bio-card"
          hoverable
          actions={actions}
          cover={<Image src={photo} alt="User's photo" priority={false} />}
        >
          <Meta
            title={paper.about.me.title}
            avatar={<Avatar className="avatar" src={avatar.src} />}
            description={paper.about.me.content}
          />
        </Card>
        <div className="bio-site">
          <h1>{paper.about.site.title}</h1>
          <p>{paper.about.site.content}</p>
          <h1>{paper.about.darknet.title}</h1>
          <p>
            {paper.about.darknet.content}
            {paper.about.darknet.url && (
              <>
                <a href={paper.about.darknet.url} target="_blank" rel="noopener noreferrer nofollow">
                  {paper.about.darknet.label}
                </a>
                .
              </>
            )}
          </p>
        </div>
      </main>
    </Container>
  )
}

export default AnIntroductionPaper
