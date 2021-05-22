import React, { useState } from 'react'
import PropTypes from 'prop-types'



const CreateForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  CreateForm.propTypes = {
    createBlog: PropTypes.func.isRequired
  }



  const handleCreateForm = async (event) => {
    event.preventDefault()

    setTitle('')
    setUrl('')
    setAuthor('')

    createBlog({
      'title': title,
      'author': author,
      'url': url,
      'likes': 20
    })
  }


  return (
    <form onSubmit={handleCreateForm}>
      <div>
        title
        <input
          id='title'
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div>
        author
        <input
          id='author'
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>

      <div>
        url
        <input
          id='url'
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>

      <button id='create-button' type="submit">create</button>
    </form>)

}

export default CreateForm