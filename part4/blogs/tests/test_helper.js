const Blog = require('../models/blog')
const User = require('../models/user')


const initialBlogs = [
    {
        'title': 'voinhyvin',
        'author': 'Veeti',
        'url': 'http://localhost',
        'likes': '4'
    },
    {
        'title': 'nauraa',
        'author': 'Hermanni',
        'url': 'http://localhost2',
        'likes': '6'
    }
]

const nonExistingId = async () => {
    const blog = new Blog({ content: 'willremovethissoon' })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb, usersInDb
}