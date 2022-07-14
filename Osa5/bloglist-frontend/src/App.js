import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Message from './components/Message'
import ErrorMessage from './components/ErrorMessage'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage('Login successfull')
      setTimeout(() => {
        setMessage(null)
      },5000)
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
    setMessage('Logout successfull')
    setTimeout(() => {
      setMessage(null)
    },5000)
  }

  const addBlog = async (blogObject) => {
    try{
      const newBlogObject = await blogService.create(blogObject)
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat({ ...newBlogObject, user }))
      setMessage('New blog added')
      setTimeout(() => {
        setMessage(null)
      },5000)
    } catch (exception){
      setErrorMessage('Creation failed For a reason (WHY IS THIS NOT ACCESSED)')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addLike = async id => {
    const blog = blogs.find(b => b.id === id)
    try {
      const changedBlog = { ...blog, likes: blog.likes +1 }
      await blogService.update(id, changedBlog)
      setBlogs(blogs.map(blog => blog.id !==id ? blog: changedBlog))
    } catch (exception){
      setErrorMessage('Liking failed, but why?')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const deleteFromDb = async id => {
    await blogService.deleteFromDb(id)
    setBlogs(blogs.filter(blog => blog.id !== id))
  }

  const sortedBlogs =() => {
    return [...blogs].sort((a,b) => b.likes - a.likes)
  }

  const blogFormRef = useRef()

  if (user === null) {
    return (
      <div>
        <Message message ={message}/>
        <ErrorMessage errorMessage={errorMessage}/>
        <h2>Login</h2>
        <form onSubmit={ handleLogin }>
          <div>
            username
            <input
              id='username'
              type="text"
              value={ username }
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              type="password"
              value={ password }
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login-button' type="submit">login</button>
        </form>
      </div>
    )
  }

  return(
    <div>
      <Message message ={message}/>
      <h2>blogs</h2>
      <p>{user.name} logged in</p> <button id='logout-button' onClick={() => handleLogout()}>logout</button>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <NewBlogForm
          createBlog={addBlog}
        />
      </Togglable>
      {sortedBlogs().map(blog =>
        <Blog key={ blog.id } blog={ blog } addLike={ addLike } deleteBlog={ deleteFromDb } userName={ user.name}/>
      )}
    </div>
  )
}

export default App
