let token = null

const setToken =(newToken) => {
  newToken ? token = `bearer ${newToken}`
    : token = null
}
const getToken = () => {
  return token
}

const setUser = (user) => {
  window.localStorage.setItem('loggedInUser', JSON.stringify(user))
  setToken(user.token)
}

const getUser = async() => {
  const loggedUserJSON = await window.localStorage.getItem('loggedInUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    setToken(user.token)
    return user
  }
  return null
}

const clearUser = () => {
  window.localStorage.removeItem('loggedInUser')
  setToken()
}

export default { setUser, getUser, clearUser, getToken }