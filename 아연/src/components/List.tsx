import { Movie } from '@/types/movie'
import styled from '@emotion/styled'
import { DataProps, InfinitePageProps } from '@/types/pageScroll'
import Card from '@/components/Card'

export default function Row({ data }: { data: InfinitePageProps }) {
  return (
    <ListWrapper>
      {data.pages.map((group: DataProps, index: number) => (
        <div key={index}>
          {group.results.map((movie: Movie) => (
            <Card movie={movie} key={movie.id} />
          ))}
        </div>
      ))}
    </ListWrapper>
  )
}
const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
