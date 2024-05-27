import React from 'react'
import { render, fireEvent, getByText } from '@testing-library/react'
import PendingTodo from './Pendingtodo'

describe('PendingTodo component', () => {
  const todoProps = {
    index: 0,
    todoTitle: 'Test Todo',
    handleComplete: jest.fn(),
    handleDelete: jest.fn(),
    todoDescription: 'string',
    status: 'completed',
    handleEdit : jest.fn()
  }

  test('renders the PendingTodo component with basic props', () => {
    const { getByPlaceholderText, getByLabelText, getByText } = render(<PendingTodo {...todoProps} />)

    expect(getByLabelText('To Do title')).toHaveValue('Buy groceries')
    expect(getByPlaceholderText('Enter the description')).toHaveValue('Milk, eggs, bread')
    expect(getByText('Done')).toBeInTheDocument()
  })

  test('handles editing the todo title and description', () => {
    const { getByPlaceholderText, getByLabelText } = render(<PendingTodo {...todoProps} />)

    fireEvent.change(getByLabelText('To Do title'), { target: { value: 'Clean the house' } })
    fireEvent.change(getByPlaceholderText('Enter the description'), { target: { value: 'Vacuum, mop, dust' } })

    expect(getByLabelText('To Do title')).toHaveValue('Clean the house')
    expect(getByPlaceholderText('Enter the description')).toHaveValue('Vacuum, mop, dust')
  })

  test('handles completing the todo', () => {
    const { getByText } = render(<PendingTodo {...todoProps} />)

    fireEvent.click(getByText('Done'))

    expect(todoProps.handleComplete).toHaveBeenCalledWith(expect.any(Event), 0)
  })

  test('handles deleting the todo', () => {
    const { getByText } = render(<PendingTodo {...todoProps} />)

    fireEvent.click(getByText('Delete'))

    expect(todoProps.handleDelete).toHaveBeenCalledWith(0)
  })

  test('renders the PendingTodo component with edit mode', () => {
    const { getByPlaceholderText, getByLabelText, getByText } = render(<PendingTodo {...todoProps} />)

    expect(getByLabelText('To Do title')).toHaveValue('Buy groceries')
    expect(getByPlaceholderText('Enter the description')).toHaveValue('Milk, eggs, bread')
    expect(getByText('Save')).toBeInTheDocument()
  })

  test('handles saving the edited todo', () => {
    const { getByPlaceholderText, getByLabelText , getByText } = render(<PendingTodo {...todoProps} />)

    fireEvent.change(getByLabelText('To Do title'), { target: { value: 'Clean the house' } })
    fireEvent.change(getByPlaceholderText('Enter the description'), { target: { value: 'Vacuum, mop, dust' } })
    fireEvent.click(getByText('Save'))

    expect(todoProps.handleEdit).toHaveBeenCalledWith({ target: { value: 'Clean the house' } }, 0)
  })

  test('handles canceling the edit mode', () => {
    const { getByText } = render(<PendingTodo {...todoProps} />)

    fireEvent.click(getByText('Cancel'))

    expect(todoProps.handleEdit).toHaveBeenCalledWith(expect.any(Event), 0)
  })
})