import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import CreateForm from './components/createForm'
import './style.css'


const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  if (type === 'success') {
    return (
      <div className="success">
        {message}
      </div>
    )
  }

  if (type === 'error') {
    return (
      <div className="error">
        {message}
      </div>
    )
  }

}


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')



  const [user, setUser] = useState(null)

  const [notificationMessage, setNotificationMessage] = useState(null)
  // const [errorMessage, setErrorMessage] = useState('some error happened...')
  const [notificationType, setNotificationType] = useState('success')


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

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      // blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationMessage('Wrong credentials')
      setNotificationType('error')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 1000)
    }
  }

  const updateBlog = async () => {
    const allBlogs = await blogService.getAll()
    setBlogs(allBlogs)
  }

  const handleCreateBlog = async (newBlog) => {

    console.log('newBlog', newBlog.newBlog)
    try {
      let blog = await blogService.create(newBlog)
      console.log(blog)
      setNotificationMessage(`a new blog ${blog.title} by ${blog.author}`)
      setNotificationType('success')

      //update 
     let updatedBlogs = await blogService.getAll()
     setBlogs(updatedBlogs)
  

      // setTimeout(() => {
      //   setNotificationMessage(null)
      // }, 1000);
    } catch (exception) {
      alert('Create, Blog exception')
    }

  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    window.location.reload()
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
         id='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login-button' type="submit">login</button>
    </form>
  )

  const createForm = () => (
    <Togglable buttonLabel='new note'>
      <CreateForm
        createBlog={handleCreateBlog}>
      </CreateForm>
    </Togglable>
  )

  const blogList = () => {

    let sortedBlogs = blogs.sort((a, b) => a.likes - b.likes)

    return (
      <div>
        <h2>blogs</h2>
        {sortedBlogs.map(blog =>
          <Blog key={blog.id} initBlog={blog} updateBlog={updateBlog} />
        )}
      </div>
    )
  }

  return (
    <div>
      <Notification message={notificationMessage} type={notificationType} />
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged-in <button onClick={handleLogout}>logout</button> </p>
          {createForm()}
          {blogList()}
        </div>
      }
    </div>
  )
}

export default App