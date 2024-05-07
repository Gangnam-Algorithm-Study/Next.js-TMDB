import { useEffect } from 'react'
import styled from '@emotion/styled'

export default function Home() {
  useEffect(() => {
    setTimeout(function () {
      location.href = 'home'
    }, 2040)
  })

  return (
    <Container>
      <GIF src="/img/netflix.gif" />
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`
const GIF = styled.img`
  width: 60%;
`
