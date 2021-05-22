import React from 'react'
import { render, fireEvent } from '@testing-library/react'
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