import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination component', () => {
  const postsPerPage = 10;
  const totalPosts = 50;
  const paginate = jest.fn();

  it('renders the correct number of pages', () => {
    const { getAllByRole } = render(<Pagination postsPerPage={postsPerPage} totalPosts={totalPosts} paginate={paginate} />);
    const pageLinks = getAllByRole('button');
    expect(pageLinks).toHaveLength(Math.ceil(totalPosts / postsPerPage));
  });

  it('calls the paginate function when a page link is clicked', () => {
    const { getAllByRole } = render(<Pagination postsPerPage={postsPerPage} totalPosts={totalPosts} paginate={paginate} />);
    const pageLinks = getAllByRole('button');
    fireEvent.click(pageLinks[1]);
    expect(paginate).toHaveBeenCalledWith(2);
  });

  it('disables the current page link', () => {
    const { getAllByRole } = render(<Pagination postsPerPage={postsPerPage} totalPosts={totalPosts} paginate={paginate}/>);
    const pageLinks = getAllByRole('button');
    expect(pageLinks[1]).toHaveClass('disabled');
  });
});