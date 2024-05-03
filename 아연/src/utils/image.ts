import { Movie } from '@/types/movie'

interface getImageUrlProps {
  imagePath: Movie['poster_path']
  width: number
}
export const getImageUrl = ({ imagePath, width = 500 }: getImageUrlProps) => {
  return `https://image.tmdb.org/t/p/w${width}${imagePath}`
}
