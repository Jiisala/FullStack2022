import { createSlice } from '@reduxjs/toolkit'

const togglableSlice = createSlice({
  name: 'toglable',
  initialState: false,
  reducers: {
    setTogglable: {
      reducer: (state, action) => {
        state = action.payload ? action.payload : !state
        return state
      }
    }
  }
})
export const hideTogglable = () => {
  return async dispatch => dispatch(setTogglable (false))
}
export const { setTogglable } = togglableSlice.actions
export default togglableSlice.reducer