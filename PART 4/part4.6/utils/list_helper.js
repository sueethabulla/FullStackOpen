const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    if (blogs.length === 0){
      return 0
    }
    const reducer = (sum, item) => {
      return sum + item.likes
    }
    return blogs.reduce(reducer,0)
  }

  const favoriteBlog = (blogs) => {
    const reducer = (mostLiked, blog) => {
      return (mostLiked.likes > blog.likes) ? mostLiked : blog
    }
    return blogs.reduce(reducer)
  }
const listHelper = require('../utils/list_helper')
const blogs = require('./blogsJSON')

describe('Most Liked Blog', () => {

  const mostLikedBlog = {
    author: 'Edsger W. Dijkstra',
    likes: 17
  }

  test('Edsger W. Dijkstra has the most likes', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual(mostLikedBlog)
  })
})

const mostLikes = (blogs) => {
    const map = new Map()
  
    blogs.map(blog => map.set(blog.author, (map.has(blog.author)) ? map.get(blog.author) + blog.likes : blog.likes ))
  
    let mostLikes = {
      'author': '',
      'likes' : 0
    }
  
    for (let [author, likes] of map){
      if(mostLikes.likes < likes){
        mostLikes = {
          'author': author,
          'likes' : likes
        }
      }
    }
  
    return mostLikes
  }
  

  describe('favorite Blog', () => {

    const mostLikedBlog = {
      author: 'Robert C. Martin',
      blogs: 3
    }
  
    test('Robert C. Martin has the most blogs', () => {
      const result = listHelper.mostBlogs(blogs)
      expect(result).toEqual(mostLikedBlog)
    })
  })
  
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostLikes
}