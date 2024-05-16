import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { FormEvent, useReducer, useState } from 'react'

const Search = () => {
  const router = useRouter()
  const [text, setText] = useState('')
  const handleGoBack = () => {
    //console.log(text)
    router.replace('/home')
  }

  const handleTextSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(text)
    setText('')
  }
  return (
    <>
      <Form onSubmit={(e) => handleTextSubmit(e)}>
        <Button onClick={handleGoBack}>뒤로 가기</Button>
        <input
          id="text"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></input>
      </Form>
    </>
  )
}

export default Search

const Button = styled.div`
  color: white;
`
const Form = styled.form`
  display: flex;
  flex-direction: row;
`
