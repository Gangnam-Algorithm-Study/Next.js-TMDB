import pagination from '@/apis/pagination'
import List from '@/components/List'
import SearchResult from '@/components/search/Result'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import { Movie } from '@/types/movie'
import { InfinitePageProps } from '@/types/pageScroll'
import { flatFn, selectFn } from '@/utils/queryFn'
import requests from '@/utils/request'
import styled from '@emotion/styled'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { FormEvent, useCallback, useRef, useState } from 'react'

const Search = () => {
  const router = useRouter()
  const [text, setText] = useState('')
  const [original_language, set_original_language] = useState('en')
  const [genre, setGenre] = useState(18)

  const filters = {
    original_language: (lang: string) => lang === original_language,
    genre_ids: (idArr: number[]) => idArr.includes(genre),
  }
  console.log(Object.keys(filters).length)
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
    queryKey: ['fetchSearch', text, Object.keys(filters)],
    queryFn: ({ pageParam }) =>
      pagination(
        `${process.env.NEXT_PUBLIC_BASE_URL}/search/movie?query=${text}&api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
        pageParam,
      ),
    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      const { page, total_pages } = lastPage
      const result = page < total_pages ? page + 1 : undefined
      // console.log(page, total_pages, lastPage, result)
      return page < total_pages ? page + 1 : undefined
    },
    select: (data) => ({
      pages: Object.keys(filters).length
        ? selectFn(data, filters)
        : flatFn(data),
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

  const handleGoBack = () => {
    //console.log(text)s
    router.replace('/home')
  }

  const handleTextSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log(text, data)
    setText('')
  }

  return (
    <>
      <Form onSubmit={(e) => handleTextSubmit(e)}>
        <Button onClick={handleGoBack}>뒤로 가기</Button>
        <input
          id="text"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></input>
      </Form>
      {status === 'pending' && <p>불러오는 중</p>}

      {status === 'error' && <p>{error.message}</p>}

      {status === 'success' && (
        <>
          <List data={data.pages} />
        </>
      )}

      <Hide ref={loadMoreRef} />

      {isFetchingNextPage && <p>계속 불러오는 중</p>}
    </>
  )
}

export default Search

const Button = styled.div`
  color: white;
`
const Form = styled.form`
  display: flex;
  flex-direction: row;
`

const Hide = styled.div`
  height: 1px;
`
