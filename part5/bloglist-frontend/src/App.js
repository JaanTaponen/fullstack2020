import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import loginService from './services/login'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const setErrorMessage = (msg) => {
    console.log(msg)
  }

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
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
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
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
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
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
    </>

  )

  return (
    <>
      <h2>blogs</h2>
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in</p>
          <div>{blogForm()}</div>

        </div>
      }
      <br></br>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}


    </>
  )
}

export default App