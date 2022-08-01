import axios from 'axios'
import userService from './users'
const baseUrl = '/api/blogs'

let token = null

const setToken = () => {
  token = userService.getToken()
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const createNew = async (newObject) => {
  setToken()

  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}
const update = async (newObject) => {
  const id = newObject.id
  const updatedObject = { ...newObject, likes: newObject.likes +1 }
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${id}`, updatedObject, config)
  return response.data
}
const deleteFromDb = async (object) => {
  setToken()
  const id = object.id
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}
export default { getAll, createNew, update, deleteFromDb }
