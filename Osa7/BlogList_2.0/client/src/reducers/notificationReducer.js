import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: null,
  reducers: {
    setNotification: {
      reducer: (state, action) => {
        const message = action.payload
        state = message? message : null
        return state
      }
    }
  }
})
let lastTimeout = null
export const showNotification = (message, time) => {
  return dispatch => {
    dispatch(setNotification(message))
    if (lastTimeout){
      clearTimeout(lastTimeout)
    }
    lastTimeout = setTimeout(() => {
      dispatch(setNotification())

    }, time)
  }

}
export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer