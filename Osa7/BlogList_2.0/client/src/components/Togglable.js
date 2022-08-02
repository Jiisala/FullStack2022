import PropTypes from 'prop-types'
import { useEffect, useImperativeHandle, forwardRef } from 'react'
import { Button } from '../styles'
import { useDispatch, useSelector } from 'react-redux'
import { hideTogglable, setTogglable } from '../reducers/togglableReducer'

const Togglable = forwardRef((props, ref) => {
  const dispatch = useDispatch()
  const visible = useSelector(state => state.togglable)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  useEffect(() => {
    dispatch(hideTogglable)
  }, [])

  const toggleVisibility = () => {
    dispatch(setTogglable())
  }
  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })
  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {props.children}
        <Button onClick={toggleVisibility}>hide form</Button>
      </div>
    </div>
  )
})
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

Togglable.displayName = 'Togglable'
export default Togglable
