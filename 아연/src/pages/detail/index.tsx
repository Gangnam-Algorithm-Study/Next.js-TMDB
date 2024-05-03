import { getDetail, prefetchDetail } from '@/apis/detail'
import Thumbnail from '@/components/Thumbnail'
import { queryClient } from '@/pages/_app'

import { Genre, Movie } from '@/types/movie'
import styled from '@emotion/styled'

import { dehydrate, useQuery } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'

interface DetailProps {
  detail: Movie
  id: Movie['id']
}
const Detail = ({ id }: DetailProps) => {
  const { data, isSuccess } = useQuery({
    queryKey: ['detail', id],
    queryFn: () => getDetail(id),
    staleTime: 1000000,
  })

  console.log(data)

  return (
    <>
      {isSuccess ? (
        <>
          <Thumbnail
            imagePath={data.poster_path}
            title={data.title}
            width={500}
          />
          <Wrapper>
            <div>
              {data.genres.map((genre: Genre, idx: number) => (
                <div key={idx}>{genre.name}</div>
              ))}
            </div>
          </Wrapper>{' '}
          <Wrapper>
            <div>{data.title}</div>
          </Wrapper>
          <Wrapper>
            <div>{data.original_language}</div>
            <div>{data.release_date}</div>
            <div>{data.runtime}</div>
            <div>{data.vote_average}</div>
          </Wrapper>
          <Wrapper>
            <div>{data.overview}</div>
          </Wrapper>
        </>
      ) : (
        <span>에러 남...</span>
      )}{' '}
    </>
  )
}

export default Detail

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { id } = context.query

    await prefetchDetail(id as unknown as Movie['id'])
    return {
      props: {
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
        id: id,
      },
    }
  } catch (err) {
    console.log(err)
    return {
      props: {},
    }
  }
}

const Wrapper = styled.div`
  color: white;
`
