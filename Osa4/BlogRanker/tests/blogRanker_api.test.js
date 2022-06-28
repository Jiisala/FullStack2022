const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

describe('blogranker tests for saved notes', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })
  describe ('fetching', () => {
    test('blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-type', /application\/json/)
    })
    test('length of returned list is as expected', async () => {
      const response = await api.get('/api/blogs')
      expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('blogs id-field is called id', async () => {
      const response = await api.get('/api/blogs')
      const blogs = response.body
      expect(blogs[0].id).toBeDefined()
    })
  })
  describe ('posting', () => {
    test('blogs can be added to db', async () => {
      const newBlog = {
        title: 'dada',
        author: 'ismi',
        url: 'on paras ismi',
        likes: 1
      }
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-type', /application\/json/)

      const blogsAfterNew = await helper.blogsInDb()
      expect(blogsAfterNew).toHaveLength(helper.initialBlogs.length +1)

      const titles = await blogsAfterNew.map(b => b.title)
      expect(titles).toContain('dada')
    })

    test('if likes not defined default value of 1 is used', async () => {
      const newBlog = {
        title: 'HERE',
        author: 'I WONT',
        url: 'DEFINE LIKES',
      }
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-type', /application\/json/)

      const blogsAfterNew = await helper.blogsInDb()
      expect(blogsAfterNew[blogsAfterNew.length -1].likes).toEqual(0)
    })

    test('blogs with incomplete information wont be added', async () => {
      const noTitleBlog = {
        author: 'I WONT',
        url: 'DEFINE TITLE',
      }
      const noAuthorBlog = {
        title: 'NO AUTHOR',
        url: 'HERE',
      }
      const noURLBlog = {
        title: 'HERE',
        author: 'I WONT DEFINE URL',
      }
      await api
        .post('/api/blogs')
        .send(noTitleBlog)
        .expect(400)
      await api
        .post('/api/blogs')
        .send(noAuthorBlog)
        .expect(400)
      await api
        .post('/api/blogs')
        .send(noURLBlog)
        .expect(400)

      const blogsAfterNew = await helper.blogsInDb()
      expect(blogsAfterNew).toHaveLength(helper.initialBlogs.length)
    })
  })
  describe('deleting', () => {
    test('deleting a blog succeeds', async () => {
      const blogsAtStart = await helper.blogsInDb()
      await api
        .delete(`/api/blogs/${blogsAtStart[0].id}`)
        .expect (204)
      const blogsAfterDeletion = await helper.blogsInDb()
      expect (blogsAfterDeletion).toHaveLength( helper.initialBlogs.length -1)
    })
  })
  describe('updating', () => {
    test('updating a blog succeeds', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const updatedBlog = {
        title: blogsAtStart[0].title,
        author: blogsAtStart[0].author,
        url: blogsAtStart[0].url,
        likes: 1234567
      }
      await api
        .put(`/api/blogs/${blogsAtStart[0].id}`)
        .send(updatedBlog)
        .expect(201)
        .expect('Content-type', /application\/json/)


      const blogsAfterUpdate = await helper.blogsInDb()
      expect (blogsAfterUpdate[0].likes).toEqual(1234567)
    })
  })
  afterAll (() => {
    mongoose.connection.close()
  })
})