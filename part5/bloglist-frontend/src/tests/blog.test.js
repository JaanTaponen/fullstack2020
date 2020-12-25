import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'

describe('<Blog />', () => {
  let component
  const blog = { author: 'testauth', title: 'testtitle', url: 'testurl', likes: 2 }
  const mockHandler = jest.fn()
  beforeEach(() => {
    component = render(
      <Blog blog={blog} likeBlog={mockHandler}></Blog>
    )
  })

  test('at start only author and title are shown', () => {
    expect(component.container).toHaveTextContent('testtitle testauth')
    // url and likes are the child objects of togglablecontent
    const blog = component.container.querySelector('.togglableContent')
    expect(blog).toHaveStyle('display: none')
  })

  test('after clicking the view button, like and url are showing', () => {
    const button = component.getByText('view')
    fireEvent.click(button)
    const blog = component.container.querySelector('.togglableContent')
    expect(blog).not.toHaveStyle('display: none')
    expect(component.container).toHaveTextContent('testurl')
    expect(component.container).toHaveTextContent('likes 2')
  })
  test('button is clicked twice', () => {
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
/*
describe('<BlogForm />', () => {

})*/