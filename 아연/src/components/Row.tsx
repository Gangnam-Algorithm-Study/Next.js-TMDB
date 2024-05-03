import Thumbnail from '@/components/Thumbnail'
import { Movie } from '@/types/movie'
import styled from '@emotion/styled'
import { DataProps, InfinitePageProps } from '@/types/pageScroll'
import { useRouter } from 'next/router'
import { saveScrollY } from '@/utils/scroll'

export default function Row({ data }: { data: InfinitePageProps }) {
  const router = useRouter()
  const handle = (id: Movie['id']) => {
    console.log(id)
    saveScrollY()
    router.push(`/detail?id=${id}`)
  }
  return (
    <Wrapper>
      {data.pages.map((group: DataProps, index: number) => (
        <div key={index}>
          {group.results.map((movie: Movie) => (
            <div key={movie.id}>
              <button onClick={() => handle(movie.id)}>
                <Thumbnail imagePath={movie.poster_path} title={movie.title} />
                <p key={movie.id}>{movie.title}</p>
              </button>
            </div>
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
