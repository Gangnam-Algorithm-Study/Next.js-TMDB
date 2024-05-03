import SEO from '@/components/common/SEO'
import styled from '@emotion/styled'
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
