import React from 'react';
import { render, fireEvent, getByRole } from '@testing-library/react';
import App  from './App';

describe('App', () => {
  it('renders the header', () => {
    const { getByText } = render(<App />);
    expect(getByText('Prioritize Your Day')).toBeInTheDocument();
  });

  it('renders the add todo button', () => {
    const { getByText } = render(<App />);
    expect(getByText('Add To Do Item')).toBeInTheDocument();
  });

  it('renders the modal when add todo button is clicked', () => {
    const { getByText, getByRole } = render(<App />);
    const addButton = getByText('Add To Do Item');
    fireEvent.click(addButton);
    expect(getByRole('dialog')).toBeInTheDocument();
  });

  it('renders the todo form in the modal', () => {
    const { getByText, getByRole } = render(<App />);
    const addButton = getByText('Add To Do Item');
    fireEvent.click(addButton);
    const modal = getByRole('dialog');
    expect(modal).toContainElement(getByText('Enter the things to do'));
    expect(modal).toContainElement(getByText('Enter To do Description'));
  });

  it('calls handleFormSubmit when the form is submitted', () => {
    const handleFormSubmit = jest.fn();
    const { getByText , getByRole} = render(<App />);
    const addButton = getByText('Add To Do Item');
    fireEvent.click(addButton);
    const form = getByRole('form');
    fireEvent.submit(form);
    expect(handleFormSubmit).toHaveBeenCalledTimes(1);
  });

  it('renders the pending todos', () => {
    const todos = [
      { title: 'Todo 1', status: 'pending', description: 'Description 1' },
      { title: 'Todo 2', status: 'pending', description: 'Description 2' },
    ];
    const { getByText } = render(<App />);
    expect(getByText('Todo 1')).toBeInTheDocument();
    expect(getByText('Todo 2')).toBeInTheDocument();
  });

  it('renders the completed todos', () => {
    const todos = [
      { title: 'Todo 1', status: 'completed', description: 'Description 1' },
      { title: 'Todo 2', status: 'completed', description: 'Description 2' },
    ];
    const { getByText } = render(<App />);
    expect(getByText('Todo 1')).toBeInTheDocument();
    expect(getByText('Todo 2')).toBeInTheDocument();
  });

  it('calls handleComplete when a todo is marked as completed', () => {
    const handleComplete = jest.fn();
    const { getByText } = render(<App />);
    const todo = getByText('Todo 1');
    fireEvent.click(todo);
    expect(handleComplete).toHaveBeenCalledTimes(1);
  });

  it('calls handleDelete when a todo is deleted', () => {
    const handleDelete = jest.fn();
    const { getByText } = render(<App />);
    const todo = getByText('Todo 1');
    fireEvent.click(todo);
    expect(handleDelete).toHaveBeenCalledTimes(1);
  });
});