const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})
blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    response.status(404).end()
  }
  response.json(blog.toJSON())
})

blogRouter.post('/', async (request, response) => {
  const body = request.body

  const user = request.user
  if (!user) {
    return response.status(401).json({
      error: 'user missing',
    })
  }
  const blog = await new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  }).populate('user')

  if (!blog.title || !blog.author || !blog.url) {
    return response.status(400).json({
      error: 'missing fields',
    })
  }

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (!(blog.user.toString() === user.id.toString())) {
    return response.status(401).json({ error: 'only the author can delete' })
  }
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    likes: body.likes,
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  }).populate('user')

  response.status(201).json(updatedBlog)
})
module.exports = blogRouter
