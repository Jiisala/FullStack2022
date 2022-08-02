import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'
import { Button, Input,  HWrapper } from '../styles'
import Message from './Message'


const LoginForm = () => {
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    const username = event.target.Username.value
    const password = event.target.Password.value
    dispatch(login({ username, password }))

  }
  return(
    <div>
      <Message />

      <HWrapper>
        <h2>LOGIN</h2>
      </HWrapper>
      <form onSubmit={handleLogin}>
        <div>
            username &gt;
          <Input
            id="username"
            type="text"
            name="Username"
            autoComplete="username"
          />
        </div>
        <div>
            password &gt;
          <Input
            id="password"
            type="password"
            name="Password"
            autoComplete="current-password"
          />
        </div>
        <Button id="login-button" type="submit">
            login
        </Button>
      </form>
    </div>
  )
}

export default LoginForm