import SEO from '@/components/common/SEO'
import Head from 'next/head'

interface LayoutProps {
  children: React.ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <SEO title="Cognisle" description="지혜의 숲" image="" />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </>
  )
}

export default Layout
