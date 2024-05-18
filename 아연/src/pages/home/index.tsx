import requests from '@/utils/request'

import { dehydrate, useInfiniteQuery } from '@tanstack/react-query'
import pagination from '@/apis/pagination'
import { useEffect, useRef } from 'react'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import List from '@/components/List'
import { InfinitePageProps } from '@/types/pageScroll'
import styled from '@emotion/styled'
import { queryClient } from '@/pages/_app'
import { getScrollY, setScrollY } from '@/utils/scroll'
import { withCSR } from '@/hooks/withClient'
import { GetServerSideProps } from 'next/types'
import { flatFn } from '@/utils/queryFn'

const Home = () => {
  const loadMoreRef = useRef(null)
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['fetchTopRated'],
    queryFn: ({ pageParam }) =>
      pagination(requests['fetchTopRated'], pageParam),
    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      const { page, total_pages } = lastPage
      // const result = page < total_pages ? page + 1 : undefined
      // console.log(page, total_pages, lastPage, result)
      return page < total_pages ? page + 1 : undefined
    },
    select: (data) => ({
      pages: flatFn(data),
      pageParams: data.pageParams,
    }),
  })
  // useObserver로 넘겨줄 callback, entry로 넘어오는 HTMLElement가
  // isIntersecting이라면 무한 스크롤을 위한 fetchNextPage가 실행될 것이다.
  const onIntersect = ([entry]: IntersectionObserverEntry[]) => {
    /*console.log(
      'Onintersecting',
      entry.isIntersecting,
      entry.intersectionRect,
      isFetchingNextPage,
    )
    */
    entry.isIntersecting && fetchNextPage()
  }

  // useObserver로 bottom ref와 onIntersect를 넘겨 주자.
  useIntersectionObserver({
    target: loadMoreRef,
    onIntersect,
  })

  // console.log(data?.pages[0].results)
  return (
    <>
      {hasNextPage && !isFetching && <p>불러오는 중</p>}

      {status === 'error' && <p>{error.message}</p>}

      {status === 'success' && (
        <>
          <List data={data.pages} />
        </>
      )}

      <Hide ref={loadMoreRef} />
    </>
  )
}

export default Home

const getServerSideProps: GetServerSideProps = withCSR(async (ctx: any) => {
  queryClient.prefetchInfiniteQuery({
    queryKey: ['fetchTopRated'],
    queryFn: ({ pageParam }) =>
      pagination(requests['fetchTopRated'], pageParam),
    initialPageParam: 1,
  })
  console.log('server side')

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  }
})

const Hide = styled.div`
  height: 1px;
`
