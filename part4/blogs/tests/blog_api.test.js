const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)
    expect(titles).toContain(
        'voinhyvin'
    )
})

test('a valid blog can be added ', async () => {
    const newBlog = {
        'title': 'lmao',
        'author': 'Jonne',
        'url': 'http://localhost2',
        'likes': '8'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201) //because we return 201 when new one is created
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(n => n.title)
    expect(titles).toContain(
        'lmao'
    )
})

test('blog without title, url is not added', async () => {
    const newBlog = {
        'author': 'Hermanni',
        'likes': '12'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('likes default to 0', async () => {
    const newBlog = {
        'title': 'lmao',
        'author': 'Jonne',
        'url': 'http://localhost2'
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)
})

test('a blog has correctly formatted id keyname', async () => {
    const response = await api.get('/api/blogs')

    const keys = Object.keys(response.body.find(p => p)).find(b => b === 'id')
    expect(keys).toBeDefined()
})


test('a blog can be deleted with id', async () => {
    const blogs = await helper.blogsInDb()
    await api.delete(`/api/blogs/${blogs[0].id}`).expect(204)
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
})

test('a blog can be updated with id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const id = blogsAtStart[0].id
    const newBlog = {
        'title': 'lmao',
        'author': 'Jonne',
        'url': 'http://localhost2',
        'likes': '8'
    }

    await api
        .put(`/api/blogs/${id}`)
        .send(newBlog)
        .expect(200) //because we return 201 when new one is created
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const title = blogsAtEnd.find(b => b.id === id)
    delete title['id']
    expect(blogsAtEnd).toContain(
        title
    )
})

afterAll(() => {
    mongoose.connection.close()
}) 