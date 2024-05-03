import { Movie } from '@/types/movie'
import { LazyLoadImage } from 'react-lazy-load-image-component'

interface ThumbnailProps {
  imagePath: Movie['poster_path']
  title: Movie['title']
}
function Thumbnail({ imagePath, title }: ThumbnailProps) {
  return (
    <div>
      <LazyLoadImage
        src={`https://image.tmdb.org/t/p/w500${imagePath}`}
        alt={title}
      />
    </div>
  )
}

export default Thumbnail
