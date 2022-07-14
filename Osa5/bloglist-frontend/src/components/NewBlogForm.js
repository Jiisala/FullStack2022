import { useState } from 'react'

const NewBlogForm = ({ createBlog }) => {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url
    })
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return(
    <div>

      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div>
            Title:
          <input
            id='title'
            type="title"
            value={ title }
            onChange= { handleTitleChange }
            placeholder='Blog title'
          />
        </div>
        <div>
            Author:
          <input
            id='author'
            type="author"
            value={ author }
            onChange={ handleAuthorChange }
            placeholder='Blog author'

          />
        </div>
        <div>
            Url:
          <input
            id='blogUrl'
            type="url"
            value={ url }
            onChange={ handleUrlChange }
            placeholder='Blog url'

          />
        </div>
        <button id='create-Button' type="submit">create</button>
      </form>
    </div>
  )
}

export default NewBlogForm