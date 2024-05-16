import { queryClient } from '@/pages/_app'
import { Movie } from '@/types/movie'

const API_KEY = process.env.NEXT_PUBLIC_API_KEY
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

// 'https://api.themoviedb.org/3/search/movie?query=Jack+Reacher&api_key=API_KEY'

// Assuming getQuerySearch is defined somewhere
/*
export async function prefetchQuerySearch(query: string): Promise<void> {
  try {
    await queryClient.prefetchQuery({
      queryKey: ['querySearch', query],
      queryFn: () => getQuerySearch(query),
    })
  } catch (error) {
    console.error('Failed to prefetch detail:', error)
    // Handle the error appropriately
  }
}
*/
