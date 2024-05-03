import { signIn } from 'next-auth/react'

const Login = () => {
  const handleLogin = () => {
    const email = '0321minji@daum.net'
    const password = '12341234'
    signIn('credentials', {
      email,
      password,
    })
  }
  return (
    <div>
      Login
      <button onClick={handleLogin}>로그인</button>
    </div>
  )
}

export default Login
