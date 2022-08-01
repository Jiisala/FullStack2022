import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        if (content){ 
            dispatch(createAnecdote(content))
            dispatch(showNotification(`You added the anecdote: "${content}"`,2000))
        }
        else {dispatch(showNotification('You have to offer an anecdote to add', 2000))           
        }

    }
    return (
        <div>
            <h2>create new</h2>
        <form onSubmit={addAnecdote}>
          <div><input name='anecdote'/></div>
          <button type='submit'>create</button>
        </form>
        </div>
    )
}

export default AnecdoteForm