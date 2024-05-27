import React from 'react';

interface PaginationProps {
    postsPerPage : number,
    totalPosts : number,
    paginate : paginate
}

interface paginate { (index:number): void }

const Pagination = (props : PaginationProps) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(props.totalPosts / props.postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination overflow-auto'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <span onClick={() => props.paginate(number)} className='page-link'>
              {number}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination