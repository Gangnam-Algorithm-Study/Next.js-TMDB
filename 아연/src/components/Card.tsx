import Thumbnail from '@/components/Thumbnail'
import { Movie } from '@/types/movie'
import { saveScrollY } from '@/utils/scroll'
import Link from 'next/link'

const Card = ({ movie }: { movie: Movie }) => {
  const handleCardClick = () => {
    console.log('Clicked Movie Id: ', movie.id)
    saveScrollY()
  }
  return (
    <Link
      href={`/detail?id=${movie.id}`}
      onClick={() => handleCardClick()}
      key={movie.id}
    >
      <Thumbnail imagePath={movie.poster_path} title={movie.title} />
      <p key={movie.id}>{movie.title}</p>
    </Link>
  )
}

export default Card
