import { DataProps } from '@/types/pageScroll'

// https://api.themoviedb.org/3/trending/all/week?api_key=2745514a927da2138a52f260f6dc1ac2&page=7

async function pagination(url: string, pageParam: number): Promise<DataProps> {
  const response = await fetch(`${url}&page=${pageParam}`)

  const { page, results, total_pages } = await response.json()
  // console.log('API', page, total_pages)

  return { page, total_pages }
}

export default pagination
