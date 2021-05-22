import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ initBlog, updateBlog }) => {
  const [displayAll, setDisplayAll] = useState(false)
  const [likes, setLike] = useState(initBlog.likes)
  const [blog, setBlog] = useState(initBlog)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  const displayTitleAndAuthor = () => (
    <div  className='blog' style={blogStyle}>
      {blog.title} {blog.author}
      <button className='view_button' onClick={() => setDisplayAll(true)}>View</button>
    </div>
  )

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

  const handleDelete = async () => {
    if (window.confirm( 'Do you really want to leave?' )) {
      await blogService.deleteBlog(blog.id)
      updateBlog()
    }
  }

  const displayBlog = () => (
    <div  className='blog' style={blogStyle}>
      {blog.title}
      <button  onClick={() => setDisplayAll(false)}>Hide</button>
      <br></br>
      {blog.url}
      <br></br>
      {likes}
      <button id='like_but' onClick={handleLike}>like</button>
      {/* <button id='like_but'>like</button> */}

      <br></br>
      {blog.author}
      <br></br>
      <button onClick={handleDelete}>delete</button>
    </div>
  )

  return (
    <div>
      {displayAll ?  displayBlog() : displayTitleAndAuthor()}
    </div>
  )
}
export default Blog
