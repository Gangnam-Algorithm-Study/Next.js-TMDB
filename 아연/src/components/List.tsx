import { Movie } from '@/types/movie'
import styled from '@emotion/styled'
import { DataProps, InfinitePageProps } from '@/types/pageScroll'
import Card from '@/components/Card'
import { useEffect } from 'react'
import { getScrollY, setScrollY } from '@/utils/scroll'

export default function List({ data }: { data: InfinitePageProps['pages'] }) {
  /*useEffect(() => {
    const scrollY = getScrollY()
    if (!scrollY) {
      return
    } else if (scrollY) {
      setTimeout(() => {
        setScrollY(scrollY)
        console.log('scroll')
      }, 1500)
    }
  }, [data.pages.length])*/
  console.log('enjlknelj', data)
  return (
    <ListWrapper>
      {data.map((item: Movie, index: number) => (
        <div key={index}>
          <Card movie={item} key={item.id} />
          {/*{group.map((movie: Movie) => (
            <Card movie={movie} key={movie.id} />
          ))}*/}
        </div>
      ))}
    </ListWrapper>
  )
}
const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
