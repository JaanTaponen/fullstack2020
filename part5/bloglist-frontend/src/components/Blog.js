import React, { useState, useImperativeHandle } from 'react'

const Blog = React.forwardRef(({ blog }, ref) => {
  const [visible, setVisible] = useState(false)

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

  const renderdetails = () => {
    return (
      <>
        {blog.title}
        <div>
          {blog.url}
        </div>
        <div>
          {blog.likes}
          <button >
            {"like"}
          </button>
        </div>
        <div>
          {blog.author}
        </div>
      </>
    )
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        {renderdetails()}
        <button onClick={toggleVisibility}>hide</button>
      </div>
    </div>
  )
})

export default Blog
