import SEO from '@/components/common/SEO'
import styled from '@emotion/styled'
import Head from 'next/head'
import { useRouter } from 'next/router'

interface LayoutProps {
  children: React.ReactNode
}

function Layout({ children }: LayoutProps) {
  const { pathname } = useRouter()
  console.log(pathname)
  return (
    <>
      {pathname !== '/detail' && (
        <SEO title="Movie App" description="영화 앱" image="" />
      )}
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>{children}</Container>
    </>
  )
}

export default Layout

const Container = styled.div`
  width: 400px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2rem auto; // 중앙 정렬
`
