


import React, { useState } from 'react'

const CreateForm  = ({createBlog}) => { 

const [title, setTitle] = useState('')
const [author, setAuthor] = useState('')
const [url, setUrl] = useState('')


const createForm = () => (
  <Togglable buttonLabel='new note'>
    <CreateForm
      createBlog={handleCreateBlog}>
    </CreateForm>
  </Togglable>
)

const handleCreateBlog = async (newBlog) => {

  console.log('newBlog', newBlog.newBlog)
  try {
    let blog = await blogService.create(newBlog)
    console.log(blog)
    setNotificationMessage(`a new blog ${blog.title} by ${blog.author}`)
    setNotificationType('success');
    // setTimeout(() => {
    //   setNotificationMessage(null)
    // }, 1000);
  } catch (exception) {
    alert('Create, Blog exception')
  }

}
return ( 
<form onSubmit={handleCreateForm}>
      <div>
        title
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div>
        author
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>

      <div>
        url
        <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>

      <button type="submit">create</button>
    </form> )

}

export default CreateForm