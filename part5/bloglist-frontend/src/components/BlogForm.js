import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    const [author, setAuthor] = useState('')
    const [title, setTitle] = useState('')
    const [url, setURL] = useState('')
    const handleAuthorChange = (event) => { setAuthor(event.target.value) }
    const handleTitleChange = (event) => { setTitle(event.target.value) }
    const handleURLChange = (event) => { setURL(event.target.value) }

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            author: author,
            title: title,
            url: url
        })
    }
    return (
        <div>
            <h3>Create a new</h3>
            <form onSubmit={addBlog}>
                <div>
                    <input
                        value={title}
                        onChange={handleTitleChange}
                    />title
            </div>
                <div>
                    <input
                        value={author}
                        onChange={handleAuthorChange}
                    />author
          </div>
                <div>
                    <input
                        value={url}
                        onChange={handleURLChange}
                    />url
          </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default BlogForm