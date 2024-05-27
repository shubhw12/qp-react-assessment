import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Completedtodo from './Completedtodo'

describe('Completedtodo component', () => {
  const props = {
    index: 0,
    todoTitle: 'Test Todo',
    handleComplete: jest.fn(),
    handleDelete: jest.fn(),
    todoDescription: 'string',
    status: 'completed',
    handleEdit : jest.fn()
  }

  it('renders the component with all its elements', () => {
    const { getByText, getByLabelText } = render(<Completedtodo {...props} />)
    expect(getByText(props.todoTitle)).toBeInTheDocument()
    expect(getByLabelText('Rotate Left')).toBeInTheDocument()
    expect(getByLabelText('Trash')).toBeInTheDocument()
  })

  it('calls the `handleComplete` function when the "Rotate Left" button is clicked', () => {
    const { getByLabelText } = render(<Completedtodo {...props} />)
    fireEvent.click(getByLabelText('Rotate Left'))
    expect(props.handleComplete).toHaveBeenCalledWith(expect.any(Object), props.index)
  })

  it('calls the `handleDelete` function when the "Trash" button is clicked', () => {
    const { getByLabelText } = render(<Completedtodo {...props} />)
    fireEvent.click(getByLabelText('Trash'))
    expect(props.handleDelete).toHaveBeenCalledWith(props.index)
  })

  const propsWithEdit = {
    ...props,
    isEdit: false
  }

  it('renders the component with the `text-decoration-line-through` class when `isEdit` is false', () => {
    const { getByText } = render(<Completedtodo {...propsWithEdit} />)
    expect(getByText(propsWithEdit.todoTitle)).toHaveClass('text-decoration-line-through')
  })

  it('renders the component without the `text-decoration-line-through` class when `isEdit` is true', () => {
    const { getByText } = render(<Completedtodo {...props} />)
    expect(getByText(props.todoTitle)).not.toHaveClass('text-decoration-line-through')
  })
})