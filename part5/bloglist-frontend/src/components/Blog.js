import React, { useState, useImperativeHandle } from 'react'

const Blog = React.forwardRef(({ blog, likeBlog, deleteBlog }, ref) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)


  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }


  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const updateBlog = () => {
    likeBlog(blog)
    setLikes(likes + 1)
  }

  const deletethis = () => {
    deleteBlog(blog)
  }

  const renderdetails = () => {
    return (
      <>
        <div>
          {blog.url}
        </div>
        <div id="likeamount" className="likeamount" >
          likes {blog.likes}
          <button id="like" className="likeButton" onClick={updateBlog}>
            {'like'}
          </button></div>
        <div>
          <button id="delete" className="deleteButton" onClick={deletethis}>
            {'delete'}
          </button>
        </div>
      </>
    )
  }

  return (
    <div style={blogStyle} id="blogDiv" className="blogDiv">
      {blog.title} {blog.author}
      <div style={hideWhenVisible}>
        <button className="view" id="view" onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className="togglableContent" >
        {renderdetails()}
        <button onClick={toggleVisibility}>hide</button>
      </div>
    </div>
  )
})
Blog.displayName = 'Blog'
export default Blog
