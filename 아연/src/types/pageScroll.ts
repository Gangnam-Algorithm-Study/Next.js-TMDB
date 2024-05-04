import { Movie } from '@/types/movie'

export interface DataProps {
  total_pages: number
  page: number
  results: Movie[]
}

export interface InfinitePageProps {
  pages: DataProps[]
  pageParams: number[]
}
