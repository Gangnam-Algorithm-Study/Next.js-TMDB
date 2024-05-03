import { Movie } from '@/types/movie'
import { LazyLoadImage } from 'react-lazy-load-image-component'

interface ThumbnailProps {
  imagePath: Movie['poster_path']
  title: Movie['title']
  width: number
}
function Thumbnail({ imagePath, title, width = 500 }: ThumbnailProps) {
  return (
    <>
      <LazyLoadImage
        src={`https://image.tmdb.org/t/p/w${width}${imagePath}`}
        style={{ objectFit: 'cover' }}
        alt={title}
      />
    </>
  )
}

export default Thumbnail
