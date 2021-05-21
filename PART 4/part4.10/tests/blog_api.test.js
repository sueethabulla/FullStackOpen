const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('../utils/test_helper')
//const logger = require('../utils/logger')

beforeEach(async () => {
    await Blog.deleteMany({})
  
    const BlogObjects = helper.initialBlogs
      .map(blog => new Blog(blog))
    const promiseArray = BlogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })
  
  describe('HTTP GET /api/blogs ', () => {
    test('http application returns the correct amount of blog', async () => {
      const response = await api.get('/api/blogs')
      expect(response.body.length).toBe(helper.initialBlogs.length)
    })
  })

  describe('HTTP id  ', () => {
    test('http unique identifier property of the blog posts is named id', async () => {
      const response = await api.get('/api/blogs')
      expect(response.body[0].id).toBeDefined()
    })
  })

  describe('HTTP POST /api/blogs ', () => {
    test('http application returns the correct amount of blog', async () => {
  
      const newBlog = {
        '_id': '5a422a851b54a676234d17f9',
        'title': 'qwertyu',
        'author': 'Nisko L',
        'url': 'https://reactpatterns.com/',
        'likes': 100,
        '__v': 0
      }
  
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      const response = await api.get('/api/blogs')
      expect(response.body.length).toBe(helper.initialBlogs.length + 1)
    })
  })
afterAll(() => {
  mongoose.connection.close()
})