
# 5.22: bloglist end to end testing, step6
Make a test which checks that the blogs are ordered according to likes with the blog with the most likes being first.

```js

//command.js 
Cypress.Commands.add('createBlog', ( title, author, url, likes ) => {
  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    body: { 
      "title":title,
      "author":author,
       "url": url,
       "likes":likes
     },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
    }
  })
  cy.visit('http://localhost:3000')
})

// test
    it('order by like', function() {

			cy.createBlog('title1','author1', 'www.url.com', 2)
			cy.createBlog('first','author1', 'www.url.com', 1)
			cy.createBlog('title2','author1', 'www.url.com', 7)

		})

```

# 5.20: bloglist end to end testing, step4, # 5.21: bloglist end to end testing, step5

Make a test which checks that user can like a blog.
Make a test for ensuring that the user who created a blog can delete it.

```js
    it('A blog can be created -> like -> delete the blog,', function() {
			cy.contains('new note').click()
			cy.get('#title').type('some title')
      cy.get('#author').type('nisko')
			cy.get('#url').type('www.chinisko.com')
			cy.get('#create-button').click()
			cy.contains('View').click()
			cy.contains('like').click()
      cy.contains('21')
      cy.contains('delete').click()
		})
```

# 5.19: bloglist end to end testing, step3
Make a test which checks that a logged in user can create a new blog. The structure of the test could be as follows

```js

// helper in commands.js
Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

//test
	describe('When logged in', function() {
    beforeEach(function() {
			// log in user here
			cy.login({ username: 'Zoro', password: 'sword' })
			cy.contains('Zoro logged-in')
    })

    it('A blog can be created', function() {
			cy.contains('new note').click()
			cy.get('#title').type('some title')
      cy.get('#author').type('nisko')
			cy.get('#url').type('www.chinisko.com')
			cy.get('#create-button').click()
			cy.contains('by')
    })
  })

  ```
# 5.18: bloglist end to end testing, step2

Make tests for logging in. Test both successful and unsuccessful log in attempts.
```js
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
		cy.visit('http://localhost:3000')

		const user = {
      name: 'Zoro',
      username: 'Zoro',
      password: 'sword'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)

	})
	

	it('Login form is shown', function() {
		// ...
		cy.contains('login')

  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
			// ...
			cy.get('#username').type('Zoro')
			cy.get('#password').type('sword')
			cy.get('#login-button').click()
			cy.contains('Zoro logged-in')
    })

    it('fails with wrong credentials', function() {
			// ...
			cy.get('#username').type('Zoro')
			cy.get('#password').type('word')
			cy.get('#login-button').click()
			cy.get('.error').contains('Wrong credentials')
    })
	})
	
})
```

Make a new user in the beforeEach block for the tests.
# 5.17: bloglist end to end testing, step1
Configure Cypress to your project. Make a test for checking that the application displays the login form by default.

```js
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000')
    
    const user = {
      name: 'Zoro',
      username: 'Zoro',
      password: 'sword'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)

  })

  it('Login form is shown', function() {
		// ...
		cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Zoro',
      username: 'Zoro',
      password: 'sword'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
		
  })
})
```

The beforeEach formatting blog must empty the database
# 5.16*: Blog list tests, step4
Make a test for the new blog form. The test should check, that the form calls the event handler it received as props with the right details when a new blog is called.

```js
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CreateForm from './CreateForm'

test('<CreateForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(
    <CreateForm createBlog={createBlog} />)

  const author = component.container.querySelector('#author')
  const form = component.container.querySelector('form')


  fireEvent.change(author, {
    target: { value: 'testing of forms could be easier' }
  })
  fireEvent.submit(form)
  expect(createBlog.mock.calls).toHaveLength(1)
})
```

# 5.15: Blog list tests, step3
Make a test which ensures that if the like button is clicked twice, the event handler the component received as props is called twice.

- Note: I can't write a test for this since my Blog component does not receive a event handler for the like button. The event handler is in the component itself. 

# 5.14: Blog list tests, step2
Make a test which checks that blog's url and number of likes are shown when the button controlling the shown details has been clicked.

```js
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'A title',
    author: 'Hector',
    url: 'www.chinisko.com',
    likes: 20
  }

  const mockHandler = jest.fn()
  const component = render(
    <Blog initBlog={blog} updateBlog={mockHandler} />
  )

  // const button = component.container.querySelector('.view_button')
  const button = component.getByText('View')
  expect(button).toBeDefined()

  fireEvent.click(button)

  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent('www.chinisko.com')
  // console.log(prettyDOM(div))
})
```

# 5.13: Blog list tests, step1
Make a test which checks that the component displaying a blog renders the blog's title and author, but does not render its url or number of likes by default

```js
import React from 'react'
import { render } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'A title',
    author: 'Hector'
  }

  const mockHandler = jest.fn()
  const component = render(
    <Blog initBlog={blog} updateBlog={mockHandler} />
  )

  const div = component.container.querySelector('.blog')
  expect(div).toBeDefined()
  console.log(prettyDOM(div))

})
```

# 5.12: Blog list frontend, step12
Add ESlint to the project. Define the configuration according to your liking. Fix all of the linter errors.

Create-react-app has installed ESlint to the project by default, so all that's left for you to do is to define your desired configuration in the .eslintrc.js file.

NB: do not run the eslint --init command. It will install the latest version of ESlint that is not compatible with the configuration file created by create-react-app!


## for windows 
- Inside VS Code use: Ctrl+Shift+P or Shift+Cmd+P.
- Type: Preferences: Open Settings (JSON)
- Select the option.
- Update eslint-related code inside the opened JSON file.
```js
    "eslint.workingDirectories": [{ "mode": "auto" }]
```

# 5.11: Blog list frontend, step11
Define PropTypes for one of the components of your application.

```js
  CreateForm.propTypes = {
    createBlog: PropTypes.func.isRequired,
  }

  // CreateForm.propTypes = {
  //   createBlog: PropTypes.func.isRequired,
  //   password: PropTypes.string.isRequired
  // }

```


# 5.10*: Blog list frontend, step10
Add a new button for deleting blog posts. Also implement the logic for deleting blog posts in the backend.

```js
// App.js
  <Blog key={blog.id} initBlog={blog} updateBlog={updateBlog} />

//Blog.js
  const handleDelete = async () => {
    if (window.confirm("Do you really want to leave?")) {      
       await blogService.deleteBlog(blog.id)
       updateBlog()
    }
  }

// blogs.js
const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token}
  }
  const blog = await axios.delete(`${baseUrl}/${id}`, config)
  return blog.data
}

```

# 5.9*: Blog list frontend, step9
Modify the application to list the blog posts by the number of likes. Sorting the blog posts can be done with the array sort method.
```js
  const blogList = () => {

    let sortedBlogs = blogs.sort((a, b) => a.likes - b.likes)
    
    return (
      <div>
        <h2>blogs</h2>
        {sortedBlogs.map(blog =>
          <Blog key={blog.id} initBlog={blog} />
        )}
      </div>
    )
  }
```

# 5.8*: Blog list frontend, step8
Implement the functionality for the like button. Likes are increased by making an HTTP PUT request to the unique address of the blog post in the backend.

```js

  const handleLike = async () => {
    const putBlog = await blogService.update(blog.id, {
      'user': blog.user.id,
      'title': blog.title,
      'author': blog.author,
      'url': blog.url,
      'likes': blog.likes + 1
    })

    setLike(putBlog.likes)
    setBlog(putBlog)
  }
```

# 5.7* Blog list frontend, step7
Let's add each blog a button, which controls if all of the details about the blog are shown or not.

```js
import React, { useState } from 'react'
const Blog = ({ blog }) => {
  const [displayAll, setDisplayAll] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  const displayTitleAndAuthor = () => (
    <div style={blogStyle}>
      {blog.title} {blog.author} 
      <button onClick={()=>setDisplayAll(true)}>View</button>
    </div>
  )

  const displayBlog = () => (
    <div style={blogStyle}>
      {blog.title}
      <button onClick={()=>setDisplayAll(false)}>Hide</button>
      <br></br>
      {blog.url}
      <br></br>
      {blog.likes}
      <br></br>
      {blog.author}
    </div>
  )

  return (
    <div>
      {displayAll ?  displayBlog() : displayTitleAndAuthor()}
    </div>
  )
}
export default Blog
```

Full details of the blog open when the button is clicked.

# 5.6 Blog list frontend, step6
Separate the form for creating a new blog into its own component (if you have not already done so), and move all the states required for creating a new blog to this component.

```js
// App.js

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


import React, { useState } from 'react'

const CreateForm  = ({createBlog}) => { 

	const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

	
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
```

# 5.5 Blog list frontend, step5
Change the form for creating blog posts so that it is only displayed when appropriate. Use functionality similar to what was shown earlier in this part of the course material. If you wish to do so, you can use the Togglable component defined in part 5.

```js
const createForm = () => (
    <Togglable buttonLabel='new note'>
      <form onSubmit={handleCreate}>
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
      </form>
    </Togglable>
  )
  ```

# 5.4: bloglist frontend, step4
Implement notifications which inform the user about successful and unsuccessful operations at the top of the page. 

```js

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  if(type === 'success'){
    return (
      <div className="success">
        {message}
      </div>
    )
  }

  if(type === 'error'){
    return (
      <div className="error">
        {message}
      </div>
    )
  }
 
}

```


# 5.3: bloglist frontend, step3
Expand your application to allow a logged-in user to add new blogs

```js
  const handleCreate = async (event) => {
    event.preventDefault()

    const newBlog = {
      'title': title,
      'author': author,
      'url': url,
      'likes': 20
    }

    try {
      await blogService.create(newBlog)
      // setUser(user)
      setTitle('')
      setUrl('')
      setAuthor('')
    } catch (exception) {
      alert('Create, Blog exception')
    }

  }

const create = async (blogData) => {
  const config = {
    headers: { Authorization: token}
  }

  const blog = await axios.post(baseUrl, blogData, config)
  return blog.data
}
```

# 5.2: bloglist frontend, step2
Make the login 'permanent' by using the local storage. Also implement a way to log out.

```js
const handleLogout = (event) =>{
    event.preventDefault()
    window.localStorage.clear()
    window.location.reload()
  }
```

```js

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
      alert('Wrong credentials')
      // setTimeout(() => {
      //   setErrorMessage(null)
      // }, 5000)
    }

  }
  ```

# 5.1: bloglist frontend, step1
```js
import axios from 'axios'
const baseUrl = '/api/login'

const login = async credential => {
  const response = await axios.post(baseUrl, credential)
  return response.data
}

export default { login }


// 
  <div>
    {user === null ?
      loginForm() :
      <div>
        <p>{user.name} logged-in</p>
        {blogList()}
      </div>
    }
    </div>

```