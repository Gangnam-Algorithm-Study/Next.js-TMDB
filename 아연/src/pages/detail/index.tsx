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
        <Container>
          <Thumbnail
            imagePath={data.poster_path}
            title={data.title}
            width={500}
          />
          <InfoWrapper>
            <Title>{data.title}</Title>

            <Genres>
              {data.genres.map((genre: Genre, idx: number) => (
                <div key={idx}>{genre.name}</div>
              ))}
            </Genres>

            <Info>
              <div>Language: {data.original_language}</div>
              <div>Release: {data.release_date}</div>
              <div>RunTime: {data.runtime} min</div>
              <div>Rate: {data.vote_average}</div>
            </Info>
            <Row>
              <div>{data.overview}</div>
            </Row>
          </InfoWrapper>
        </Container>
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

const Container = styled.div``

const InfoWrapper = styled.div`
  margin-top: 2.5rem 0;
  color: white;
`
const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  margin: 0.5rem 0;
`
const Title = styled.div`
  font-size: 2.5rem;
  color: white;
`

const Genres = styled(Row)`
  color: #c7bbbbc8;
`

const Info = styled(Row)`
  color: white;
`
