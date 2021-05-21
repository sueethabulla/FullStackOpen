const listHelper = require('../utils/list_helper')

describe('total likes', () => {

  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a biggest list is calculated right', () => {
    const result = listHelper.totalLikes(listWithThreeBlogs)
    expect(result).toBe(8)
  })

})