import type { AppContext, AppInitialProps, AppProps } from 'next/app'
import { Global } from '@emotion/react'
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import globalStyles from '@/styles/globalStyles'
import 'public/fonts/style.css'
import Layout from '@/components/common/Layout'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // SSR에서는 클라이언트에서 즉시 재요청하는 것을 피하기 위해,

      // default staleTime을 0보다 높게 설정하는 것이 일반적입니다.

      staleTime: 10000000 * 20,
    },
  },
})
function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <Layout>
          <Global styles={globalStyles} />
          <Component {...pageProps} />
        </Layout>
      </HydrationBoundary>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  )
}
App.getInitialProps = async ({
  Component,
  ctx,
}: AppContext): Promise<AppInitialProps> => {
  let pageProps = {}

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }

  return { pageProps }
}

App.getInitialProps = async ({
  Component,
  ctx,
}: AppContext): Promise<AppInitialProps> => {
  let pageProps = {}

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }

  return { pageProps }
}

export default App
