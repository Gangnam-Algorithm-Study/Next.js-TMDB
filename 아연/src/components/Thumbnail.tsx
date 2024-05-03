import { Movie } from '@/types/movie'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { getImageUrl } from '@/utils/image'
interface ThumbnailProps {
  imagePath: Movie['poster_path']
  title: Movie['title']
  width: number
}
function Thumbnail({ imagePath, title, width = 500 }: ThumbnailProps) {
  return (
    <>
      <LazyLoadImage
        src={getImageUrl({ imagePath, width })}
        style={{ objectFit: 'cover' }}
        alt={title}
      />
    </>
  )
}

export default Thumbnail
