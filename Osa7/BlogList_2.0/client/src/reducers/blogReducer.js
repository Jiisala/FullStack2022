import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {

    updateBlogs(state, action) {
      const updatedBlog = action.payload
      return state.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog)
        .sort((a,b) => b.likes - a.likes)
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload.sort((a,b) => b.likes - a.likes)
    },
    deleteBlog(state, action) {
      const blogToDelete = action.payload
      return state.filter(blog => blog.id !== blogToDelete.id)
    }
  }
})

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}
export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.createNew(content)
    dispatch(appendBlog(newBlog))
  }
}

export const vote = content => {
  return async dispatch => {
    const updatedBlog = await blogService.update(content)
    dispatch(updateBlogs(updatedBlog))
  }
}

export const deleteFromDb = content => {
  return async dispatch => {
    const blogToDelete = content
    await blogService.deleteFromDb(content)
    dispatch(deleteBlog(blogToDelete))
  }
}

export const { appendBlog, setBlogs, updateBlogs, deleteBlog } = blogSlice.actions
export default blogSlice.reducer