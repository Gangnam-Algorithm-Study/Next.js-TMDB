import { queryClient } from '@/pages/_app'
import { Movie } from '@/types/movie'

const API_KEY = process.env.NEXT_PUBLIC_API_KEY
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

// https://api.themoviedb.org/3/movie/27007?api_key=2745514a927da2138a52f260f6dc1ac2

// Assuming getDetail is defined somewhere
export async function prefetchDetail(id: Movie['id']): Promise<void> {
  try {
    await queryClient.prefetchQuery({
      queryKey: ['detail', id],
      queryFn: () => getDetail(id),
    })
  } catch (error) {
    console.error('Failed to prefetch detail:', error)
    // Handle the error appropriately
  }
}

export async function getDetail(id: Movie['id']): Promise<any> {
  const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)

  const data = await response.json()

  return data
}
