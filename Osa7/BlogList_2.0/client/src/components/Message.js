
import { useSelector } from 'react-redux'
import { StyledMessage, StyledErrorMessage,MessageWrapper } from '../styles'

const Message = () => {
  const notification = useSelector(state => state.notifications)
  if ( notification && notification.toString().includes('Error')){
    return (<div>{notification &&
    <MessageWrapper>
      <StyledErrorMessage>
        {notification}
      </StyledErrorMessage>
    </MessageWrapper>
    }
    </div>
    )
  }
  return (<div>{notification &&
    <MessageWrapper>
      <StyledMessage>
        {notification}
      </StyledMessage>
    </MessageWrapper>
  }
  </div>
  )
}
export default Message
