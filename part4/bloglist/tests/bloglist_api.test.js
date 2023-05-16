const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper.js')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blogObject => blogObject.save())
  await Promise.all(promiseArray)
}, 10000)

describe('testing getting blogs', () => {

  test('test all blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

  }, 10000)

  test('all blogs in initialBlogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)

  }, 10000)

  test('test the unique identifer of blogs posts is named id', async () => {
    const response = await api
      .get('/api/blogs')
    const blog = response.body[0]
    expect(blog.id).toBeDefined()

  }, 10000)
})

describe('testing adding blogs', () => {

  test('testing adding a new blog', async () => {
    const blog = {
      title: 'Fake blog',
      author: 'Me',
      url: "www.google.com",
    }
    const response = await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)

    const blogsInDb = await helper.getAllBlogsInDb();

    expect(blogsInDb).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsInDb.map(blog => blog.title)
    expect(titles).toContainEqual('Fake blog')
  }, 10000)
})

describe('testing adding bad blogs', () => {

  test('testing adding a blog with missing likes prop defaults to 0 likes', async () => {
    const blog = {
      title: 'Missing likes prop',
      author: 'Me',
      url: "www.google.com",
    }
    const response = await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)

    expect(response.body.likes).toBe(0)
  }, 10000)

  test('testing adding a blog with missing url or title properties should get a bad request 400 response', async () => {
    const missingTitleBlog = {
      author: 'Me',
      url: "www.google.com"
    }

    let response = await api
      .post('/api/blogs')
      .send(missingTitleBlog)
      .expect(400)

    const missingUrlBlog = {
      title: 'Missing url prop',
      author: 'Me',
    }

    response = await api
      .post('/api/blogs')
      .send(missingUrlBlog)
      .expect(400)
  }, 10000)
})

describe('testing deletion of a blog', () => {

  test('succeeds with status code 204 if id is valid', async () => {

    const blogsAtStart = await helper.getAllBlogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.getAllBlogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    expect(blogsAtEnd).not.toContainEqual(blogToDelete)
  }, 10000)
})

describe('testing updating a blog', () => {

  test('updating the number of likes of a blog', async () => {
    const blogsAtStart = await helper.getAllBlogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const newBlog = {
      ...blogToUpdate,
      likes: 100
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newBlog)
      .expect(200)

    const blogsAtEnd = await helper.getAllBlogsInDb();
    const updatedBlog = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)
    expect(updatedBlog.likes).toBe(100)
  })
}, 10000)

afterAll(async () => {
  mongoose.connection.close()
})