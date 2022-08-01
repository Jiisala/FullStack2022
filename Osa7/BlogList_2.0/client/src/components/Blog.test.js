import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'

describe('Blog', () => {
  const mockHandler = jest.fn()

  beforeEach(() => {
    const blog = {
      title: 'great title',
      author: 'good author',
      url: 'http://www.url.com',
      likes: 123,
      user: {
        username: 'tester',
        name: 'timothy tester',
      },
    }
    render(<Blog blog={blog} addLike={mockHandler} />)
  })
  test('renders title and author by default', () => {
    screen.getByText('great title by good author')
  })

  test('does not render url or likes by default', () => {
    const element = screen.queryByText('http://www.url.com')
    expect(element).not.toBeDefined
    const element2 = screen.queryByText('123')
    expect(element2).not.toBeDefined
  })

  test('renders url and likes after pressing the button', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('great title by good author')
    await user.click(button)

    const element = screen.queryByText('http://www.url.com')
    expect(element).toBeDefined
    const element2 = screen.queryByText('123')
    expect(element2).toBeDefined
  })

  test('clicking the like button twise calls the eventhandler twise', async () => {
    const user = userEvent.setup()
    const detailsbutton = screen.getByText('great title by good author')
    await user.click(detailsbutton)
    const likebutton = screen.getByText('like')
    await user.click(likebutton)

    expect(mockHandler.mock.calls).toHaveLength(1)
    await user.click(likebutton)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
