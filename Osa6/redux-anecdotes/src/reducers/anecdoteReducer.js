import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    
    updateAnecdotes(state, action) {
      const updatedAnectode = action.payload
      return state.map(anecdote => anecdote.id !== updatedAnectode.id ? anecdote : updatedAnectode)
      .sort((a,b) => b.votes - a.votes)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload.sort((a,b) => b.votes - a.votes)
    }
  }
})

export const initializeAnecdote = () =>{
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes)) 
  }
}
export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}
export const vote = content => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update(content)
    dispatch(updateAnecdotes(updatedAnecdote))

  }

}

export const { appendAnecdote, setAnecdotes, updateAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer