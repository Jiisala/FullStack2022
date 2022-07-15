import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, addLike, deleteBlog, userName }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const handleLike = () => {
    addLike(blog.id)
  }
  const handleDelete = () => {
    if (window.confirm(`delete blog: ${blog.title} by:${blog.author} permanently`)){
      deleteBlog(blog.id)
    }
  }
  return(
    <div className ='blogStyle'>
      {blog.title} by {blog.author}
      <button id='details-button' className = 'buttonStyle' onClick={toggleVisibility}> {visible? 'close' : 'details'}</button>
      {visible && <div>{blog.url} <br/>
      Likes {blog.likes} <button id= 'like-button' className = 'buttonStyle' onClick={handleLike}> like</button> <br/>
        {blog.user.name.toString()} <br/>
        {userName === blog.user.name ?
          <button id='delete-button' className = 'buttonStyleAlert' onClick={handleDelete}>delete</button>
          : ''}
      </div>}
    </div>
  )
}
Blog.prototypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  }).isRequired,
  addLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
}
export default Blog