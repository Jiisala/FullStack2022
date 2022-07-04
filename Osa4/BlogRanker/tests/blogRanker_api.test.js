const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

describe('tests for saved blogs', () => {
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
    let token = null
    beforeEach(async () => {
      await User.deleteMany({})
      await User.insertMany(helper.initialUsers)
      const response = await api.get('/api/users')
      const users = response.body

      const userForToken = users[0]
      token = jwt.sign(userForToken, process.env.SECRET)

    })




    test('blogs can be added to db with correct user', async () => {
      const newBlog = {
        title: 'dada',
        author: 'ismi',
        url: 'on paras ismi',
        likes: 1
      }
      const auth = { 'Authorization': `bearer ${token}` }
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .set(auth)
        .expect('Content-type', /application\/json/)

      const blogsAfterNew = await helper.blogsInDb()
      expect(blogsAfterNew).toHaveLength(helper.initialBlogs.length +1)

      const titles = await blogsAfterNew.map(b => b.title)
      expect(titles).toContain('dada')
    })

    test('blogs cant be added to db withouth token', async () => {
      const newBlog = {
        title: 'tämä',
        author: 'epäonnistuu',
        url: 'ei ole',
        likes: 1
      }
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-type', /application\/json/)

      const blogsAfterNew = await helper.blogsInDb()
      expect(blogsAfterNew).toHaveLength(helper.initialBlogs.length)

    })

    test('if likes not defined default value of 1 is used', async () => {
      const newBlog = {
        title: 'HERE',
        author: 'I WONT',
        url: 'DEFINE LIKES',
      }
      const auth = { 'Authorization': `bearer ${token}` }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .set(auth)
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
      const auth = { 'Authorization': `bearer ${token}` }

      await api
        .post('/api/blogs')
        .send(noTitleBlog)
        .set(auth)
        .expect(400)
      await api
        .post('/api/blogs')
        .send(noAuthorBlog)
        .set(auth)
        .expect(400)
      await api
        .post('/api/blogs')
        .send(noURLBlog)
        .set(auth)
        .expect(400)

      const blogsAfterNew = await helper.blogsInDb()
      expect(blogsAfterNew).toHaveLength(helper.initialBlogs.length)
    })


    test('deleting a blog succeeds with correct user', async () => {
      const auth = { 'Authorization': `bearer ${token}` }
      const newBlog = {
        title: 'gonna',
        author: 'delete',
        url: 'soon',
        likes: 1
      }
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .set(auth)
        .expect('Content-type', /application\/json/)
      const blogsBeforeDelete = await helper.blogsInDb()

      await api
        .delete(`/api/blogs/${blogsBeforeDelete[blogsBeforeDelete.length -1].id}`)
        .expect (204)
        .set(auth)
      const blogsAfterDeletion = await helper.blogsInDb()
      expect (blogsAfterDeletion).toHaveLength(helper.initialBlogs.length)
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
})

describe ('Tests for users', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
  })

  test('creation succeeds with correct parameters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 't-urbo',
      name: 'Testaaja Urbo',
      password: 'enkerro'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-type', /application\/json/)
    const usersAfterNew = await helper.usersInDb()
    expect(usersAfterNew).toHaveLength(usersAtStart.length +1)

    const usernames = usersAfterNew.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with correct statuscode if username is not unique', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'juures',
      name: 'juures',
      password: 'juures'
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
  test('creation fails with correct statuscode if username is too short', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'ju',
      name: 'juures',
      password: 'juures'
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(result.body.error).toContain('username and password must be atleast three characters long')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with correct statuscode if pw is too short', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'juu',
      name: 'juures',
      password: 'ju'
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(result.body.error).toContain('username and password must be atleast three characters long')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  afterAll (() => {
    mongoose.connection.close()
  })
})