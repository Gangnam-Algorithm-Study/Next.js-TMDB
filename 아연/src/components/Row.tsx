import { Movie } from '@/types/movie'
import styled from '@emotion/styled'
import { DataProps, InfinitePageProps } from '@/types/pageScroll'
import Card from '@/components/Card'

export default function Row({ data }: { data: InfinitePageProps }) {
  return (
    <Wrapper>
      {data.pages.map((group: DataProps, index: number) => (
        <div key={index}>
          {group.results.map((movie: Movie) => (
            <Card movie={movie} key={movie.id} />
          ))}
        </div>
      ))}
    </Wrapper>
  )
}

const Container = styled.div`
  background-color: white;
`

const Wrapper = styled.div`
  padding: 100px;
`
