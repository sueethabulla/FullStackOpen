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