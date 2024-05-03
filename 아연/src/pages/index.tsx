import requests from '@/utils/request'

import { dehydrate, useInfiniteQuery } from '@tanstack/react-query'
import pagination from '@/apis/pagination'
import { useRef } from 'react'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import Row from '@/components/Row'
import { InfinitePageProps } from '@/types/pageScroll'
import styled from '@emotion/styled'
import { queryClient } from '@/pages/_app'

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
    queryKey: ['fetchDocumentaries'],
    queryFn: ({ pageParam }) =>
      pagination(requests['fetchDocumentaries'], pageParam),
    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      const { page, total_pages } = lastPage
      const result = page < total_pages ? page + 1 : undefined
      console.log(page, total_pages, lastPage, result)
      return page < total_pages ? page + 1 : undefined
    },
  })
  // useObserver로 넘겨줄 callback, entry로 넘어오는 HTMLElement가
  // isIntersecting이라면 무한 스크롤을 위한 fetchNextPage가 실행될 것이다.
  const onIntersect = ([entry]: IntersectionObserverEntry[]) => {
    console.log(
      'Onintersecting',
      entry.isIntersecting,
      entry.intersectionRect,
      isFetchingNextPage,
    )
    entry.isIntersecting && fetchNextPage()
  }

  // useObserver로 bottom ref와 onIntersect를 넘겨 주자.
  useIntersectionObserver({
    target: loadMoreRef,
    onIntersect,
  })

  console.log(data?.pages[0].results)
  return (
    <div>
      {status === 'pending' && <p>불러오는 중</p>}

      {status === 'error' && <p>{error.message}</p>}

      {status === 'success' && (
        <>
          <div>
            <Row data={data as InfinitePageProps} />
          </div>
          {/*{isFetchingNextPage && <p>계속 불러오는 중</p>}
          <div ref={loadMoreRef} />*/}
        </>
      )}

      <Hide ref={loadMoreRef} />

      {isFetchingNextPage && <p>계속 불러오는 중</p>}
    </div>
  )
}

export default Home

export async function getServerSideProps() {
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['fetchDocumentaries'],
    queryFn: ({ pageParam }) =>
      pagination(requests['fetchDocumentaries'], pageParam),
    initialPageParam: 1,
  })

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  }
}

const Hide = styled.div`
  height: 1px;
`
