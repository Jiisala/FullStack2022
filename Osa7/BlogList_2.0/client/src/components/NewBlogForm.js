import { useDispatch } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import { Button, HWrapper, Input } from '../styles'

const NewBlogForm = ({ blogFormRef }) => {

  const dispatch = useDispatch()

  const clearFields = () => {
    document.getElementById('title').value = ''
    document.getElementById('author').value = ''
    document.getElementById('blogUrl').value = ''

  }

  const addBlog = (event) => {
    event.preventDefault()
    const title = event.target.Title.value
    const author = event.target.Author.value
    const url = event.target.Url.value

    if (author && title && url){
      try {
        blogFormRef.current.toggleVisibility()
        dispatch(createBlog({ title, author, url }))
        dispatch(showNotification('New blog added',2000))
        clearFields()
      } catch (exception) {
        dispatch(showNotification('Error: Creation failed For a reason or another', 2000))

      }
    }
    else {
      dispatch(showNotification('Error: please fill all the fields', 3000))
    }
  }

  return (
    <div>
      <HWrapper primary>
        <h3>ADD NEW BLOG</h3>
      </HWrapper>
      <form onSubmit={addBlog}>
        <div>
          TITLE &gt;
          <Input
            id="title"
            type="title"
            name='Title'
            placeholder="Blog title"
          />
        </div>
        <div>
          AUTHOR &gt;
          <Input
            id="author"
            type="author"
            name='Author'
            placeholder="Blog author"
          />
        </div>
        <div>
          URL &gt;
          <Input
            id="blogUrl"
            type="url"
            name='Url'

            placeholder="Blog url"
          />
        </div>
        <Button id="create-Button" type="submit">
          create
        </Button>
      </form>
    </div>
  )
}

export default NewBlogForm
