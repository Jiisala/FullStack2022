import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import togglableReducer from './reducers/togglableReducer'
const store = configureStore({
  reducer: {
    notifications: notificationReducer,
    blogs: blogReducer,
    user: userReducer,
    togglable: togglableReducer,
  }
})

export default store