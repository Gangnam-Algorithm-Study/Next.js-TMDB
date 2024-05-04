import Thumbnail from '@/components/Thumbnail'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import { Movie } from '@/types/movie'
import { saveScrollY } from '@/utils/scroll'
import styled from '@emotion/styled'
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
        <CardWrapper>
          <Thumbnail
            imagePath={movie.poster_path}
            title={movie.title}
            width={92}
          />
          <InfoWrapper>
            <Title key={movie.id}>{movie.title}</Title>
            <Content>{movie.release_date}</Content>
          </InfoWrapper>
        </CardWrapper>
      ) : (
        <p>Loading....</p>
      )}
    </Link>
  )
}

export default Card

const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  background: rgb(66, 66, 66);

  margin: 0.25rem 0;
`
const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 2rem;
  gap: 1rem;
  color: white;
`
const Title = styled.p`
  font-size: 1.5rem;
`

const Content = styled.span``
