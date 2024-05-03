import Thumbnail from '@/components/Thumbnail'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import { Movie } from '@/types/movie'
import { saveScrollY } from '@/utils/scroll'
import Link from 'next/link'
import { useState, useRef } from 'react'

const Card = ({ movie }: { movie: Movie }) => {
  const target = useRef(null)
  const [isVisible, setIsVisible] = useState(false) // DOM을 렌더할 조건

  const handleCardClick = () => {
    console.log('Clicked Movie Id: ', movie.id)
    saveScrollY()
  }

  const onIntersect = ([entry]: IntersectionObserverEntry[]) => {
    console.log('Onintersecting', entry.isIntersecting)
    entry.isIntersecting ? setIsVisible(true) : setIsVisible(false)
  }

  // useObserver로 bottom ref와 onIntersect를 넘겨 주자.
  useIntersectionObserver({
    target,
    onIntersect,
    threshold: 0.1,
  })
  return (
    <Link
      href={`/detail?id=${movie.id}`}
      onClick={() => handleCardClick()}
      key={movie.id}
      ref={target}
    >
      {isVisible ? (
        <>
          <Thumbnail imagePath={movie.poster_path} title={movie.title} />
          <p key={movie.id}>{movie.title}</p>
          <span>{movie.overview}</span>
        </>
      ) : (
        <p>Loading....</p>
      )}
    </Link>
  )
}

export default Card
