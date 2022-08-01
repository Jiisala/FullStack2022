import { useSelector, useDispatch } from 'react-redux'
//import { vote } from '../reducers/anecdoteReducer'
import { vote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const anecdotes = useSelector(state => state.filter
    ? state.anecdotes.filter((a => a.content.toLowerCase().includes(state.filter.toLowerCase())))
    : state.anecdotes)
  const dispatch = useDispatch()
  
  const handleVote = (anecdote) => {
    dispatch(vote(anecdote))
    dispatch(showNotification(`You voted for: "${anecdote.content}"`, 2000))
    }

  return(
  <div>

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
      </div>
  )
}

export default AnecdoteList