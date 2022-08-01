import { createSlice } from '@reduxjs/toolkit'
import { showNotification } from './notificationReducer'
import loginService from '../services/login'
import userService from '../services/users'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser : (state, action) => {
      return action.payload
    },
    removeUser: (state, action) => {
      return action.payload
    }
  }
})

export const login = content => {
  return async dispatch => {
    try{
      const loggedUser = await loginService.login(content)
      userService.setUser(loggedUser)
      dispatch(setUser(loggedUser))
      dispatch(showNotification('Login successfull', 2000))

    }catch(error){
      dispatch(showNotification('Error: Login failed', 2000))

    }
  }
}
export const logout = () => {
  return async dispatch => {
    userService.clearUser()
    dispatch(removeUser(null))
  }
}
export const initializeUser = () => {
  return async dispatch => {
    const loggedinUser = await userService.getUser()
    dispatch(setUser (loggedinUser))
  }
}

export const { setUser, removeUser, } = userSlice.actions
export default userSlice.reducer