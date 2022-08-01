import {  useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  initializeBlogs, } from './reducers/blogReducer'
import {   initializeUser } from './reducers/userReducer'
import LoginForm from './components/LoginForm'
import DisplayBlogs from './components/DisplayBlogs'
import { Page } from './styles'

const App = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  if (user === null) {
    return (
      <div>
        <Page>
          <LoginForm />
        </Page>
      </div>
    )
  }

  return (
    <div>
      <Page>
        <DisplayBlogs />
      </Page>
    </div>

  )
}

export default App
