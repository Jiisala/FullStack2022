import { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, BlogWrapper, Link } from '../styles'

const Blog = ({ blog, addLike, deleteBlog, userName }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const handleLike = () => {
    addLike(blog)
  }
  const handleDelete = () => {
    if (
      window.confirm(`delete blog: ${blog.title} by:${blog.author} permanently`)
    ) {
      deleteBlog(blog)
    }
  }
  return (
    <BlogWrapper >
      <p onClick={toggleVisibility}>{blog.title} by {blog.author}</p>

      {visible && (
        <div>
          details: <Link href= {blog.url}>{blog.url} </Link><br />
          likes: {blog.likes}
          <Button id="like-button"  onClick={handleLike}>
            {' '}
            like
          </Button>{' '}
          <br />
          added by: {blog.user.name.toString()} <br />
          {userName === blog.user.name ? (
            <Button
              id="delete-button"

              onClick={handleDelete}
            >
              delete
            </Button>
          ) : (
            ''
          )}
        </div>
      )}
    </BlogWrapper>
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
    }),
  }).isRequired,
  addLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
}
export default Blog
