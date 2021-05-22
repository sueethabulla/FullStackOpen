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

  return (
    <div>
      {displayAll ?  displayBlog() : displayTitleAndAuthor()}
    </div>
  )
}
export default Blog