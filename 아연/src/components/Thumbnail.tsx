import { Movie } from '@/typings'
import Image from 'next/image'

interface ThumbnailProps {
  imagePath: Movie['poster_path']
  title: Movie['title']
}
function Thumbnail({ imagePath, title }: ThumbnailProps) {
  return (
    <div>
      <Image
        src={`https://image.tmdb.org/t/p/original${imagePath}`}
        width={150}
        height={28}
        alt={title}
      />
    </div>
  )
}

export default Thumbnail
