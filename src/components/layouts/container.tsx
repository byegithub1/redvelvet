'use client'

import Header from '@/components/layouts/header'
import Footer from '@/components/layouts/footer'

type Props = {
  children: React.ReactNode
  header: {
    title: string
    subtitle: string
    noprint: {
      title: boolean
      subtitle: boolean
    }
  }
}

const Container = ({ children, header }: Props) => {
  return (
    <section className="container">
      <div className="content-wrapper">
        <Header title={header.title} subtitle={header?.subtitle} noprint={header.noprint} />
        <hr />
        {children}
        <Footer />
      </div>
    </section>
  )
}

export default Container
