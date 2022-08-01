import Togglable from './Togglable'
import NewBlogForm from './NewBlogForm'
import Blog from './Blog'
import Message from './Message'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/userReducer'
import { showNotification } from '../reducers/notificationReducer'
import {  vote, deleteFromDb } from '../reducers/blogReducer'
import { useRef } from 'react'
import { Button, HWrapper, LogoutButtonWrapper } from '../styles'
const DisplayBlogs = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const blogFormRef = useRef()


  const handleLogout = () => {
    dispatch(logout())
    dispatch(showNotification('Logout successfull', 2000))
  }

  const addLike = async (blogObject) => {
    try {
      dispatch(vote(blogObject))
    } catch (exception) {
      dispatch(showNotification('Error: Liking failed, but why?', 2000))
    }
  }
  const deleteBlog = async (blogObject) => {
    dispatch(deleteFromDb(blogObject))
    dispatch(showNotification('Blog deleted', 2000))
  }
  return(
    <div>
      <Message />
      <LogoutButtonWrapper>
        logged in as: {user.name}
        <Button id="logout-button" onClick={() => handleLogout()}>
        logout
        </Button>
      </LogoutButtonWrapper>


      <HWrapper>
        <h1>BLOGS</h1>
              click name for details
      </HWrapper>

      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <NewBlogForm blogFormRef={blogFormRef} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          addLike={addLike}
          deleteBlog={deleteBlog}
          userName={user.name}
        />
      ))}
    </div>
  )
}

export default DisplayBlogs