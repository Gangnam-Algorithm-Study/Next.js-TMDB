import { Movie } from '@/types/movie'
import { LazyLoadImage } from 'react-lazy-load-image-component'

interface ThumbnailProps {
  imagePath: Movie['poster_path']
  title: Movie['title']
}
function Thumbnail({ imagePath, title }: ThumbnailProps) {
  return (
    <>
      <LazyLoadImage
        src={`https://image.tmdb.org/t/p/w92${imagePath}`}
        style={{ objectFit: 'fill' }}
        alt={title}
      />
    </>
  )
}

export default Thumbnail
