import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import loginService from './services/login'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [Message, setMessage] = useState(null)

  const blogFormRef = React.createRef()


  const setBlogsSorted = (blogs) => {
    setBlogs([...blogs].sort((a, b) => b.likes - a.likes))
  }

  useEffect(async () => {
    const blogs = await blogService.getAll()
    setBlogsSorted(blogs)
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const Button = (props) => {
    return (
      <button onClick={props.handleClick}>
        {props.text}
      </button>
    )
  }

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setMessage({ content: 'Logged out', status: true })
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const returnedBlog = await blogService.create(blogObject)
    setBlogsSorted(blogs.concat(returnedBlog))
    setMessage({ content: 'A new blog ' + returnedBlog.title + ' by ' + returnedBlog.author, status: true })
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const likeBlog = async (blogObject) => {
    blogObject['likes'] = blogObject['likes'] + 1
    const ret = await blogService.update(blogObject.id, blogObject)
    blogs[blogObject] = ret
    setBlogsSorted(blogs)
  }

  const deleteBlog = async (blogObject) => {
    const blogname = blogObject.title + ' by ' + blogObject.author
    if (window.confirm('Remove blog ' + blogname + '?')) {
      await blogService.deleteBlog(blogObject)
      setBlogsSorted(blogs.filter(b => b.id !== blogObject.id))
      setMessage({ content: 'Deleted blog ' + blogname, status: true })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      console.log('logging in with', username, password)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage({ content: 'Login Succesful', status: true })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessage({ content: 'Wrong Credentials', status: false })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const blogForm = () => (
    <>
      <div>{user.username} logged in
        <Button text="logout" handleClick={() => logOut()} />
      </div>
      <Togglable id="new-button" buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
    </>

  )

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    return message.status ? (
      <div className="success">{message.content}</div>) :
      (<div className="error">{message.content}</div>
      )
  }

  return (
    <>
      <h2>blogs</h2>
      <Notification message={Message} />
      {user === null ?
        loginForm() :
        <div>
          <div>{blogForm()}</div>

        </div>
      }
      <br></br>
      <div className="blogContainer" id="blogContainer">{blogs.map(blog =>
        <Blog key={blog.id} blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog} />
      )}</div>


    </>
  )
}

export default App