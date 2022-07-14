import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NewBlogForm from './NewBlogForm'
import userEvent from '@testing-library/user-event'

describe ('<newBlogForm />', () => {
  test('sends the right information when submitting a new blog', async () => {
    //const user = userEvent.setup()
    const mockCreateBlog = jest.fn()

    render(<NewBlogForm createBlog={mockCreateBlog} />)
    //const newBlogButton = screen.getByText('new blog')
    //userEvent.click(newBlogButton)
    const title = screen.getByPlaceholderText('Blog title')
    const author = screen.getByPlaceholderText('Blog author')
    const url = screen.getByPlaceholderText('Blog url')
    const sendButton = screen.getByText('create')

    await userEvent.type(title, 'new title')
    await userEvent.type(author, 'new author')
    await userEvent.type(url, 'http://www.new_url.com')
    await userEvent.click(sendButton)
    screen.debug()
    expect(mockCreateBlog.mock.calls).toHaveLength(1)
    expect(mockCreateBlog.mock.calls[0][0].title).toBe('new title')
    expect(mockCreateBlog.mock.calls[0][0].author).toBe('new author')
    expect(mockCreateBlog.mock.calls[0][0].url).toBe('http://www.new_url.com')
  })
})