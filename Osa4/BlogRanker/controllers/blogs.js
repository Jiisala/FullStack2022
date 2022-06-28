const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const { mostLikes } = require('../utils/list_helper')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)
  if (!blog.title || !blog.author || !blog.url){
    return response.status(400).json({
      error: 'missing fields'
    })
  }
  try {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch(exception) {
    next(exception)
  }
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body
  const  blog = {
    title: body.title,
    author: body.author,
    likes: body.likes
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })

  response.status(201).json(updatedBlog)
})
module.exports = blogRouter