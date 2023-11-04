import React from 'react';
import _ from 'lodash';

function Pagination(props) {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;
  console.log('current page: ', currentPage);
  const pageCount = Math.ceil(itemsCount / pageSize);

  // dont display pagination box if there is only one page
  if (pageCount === 1) return null;

  // generate page number using lodash library
  // similary to the range() in python
  const pages = _.range(1, pageCount + 1);

  return (
    <div>
      <nav aria-label='...'>
        <ul className='pagination pagination-sm'>
          {pages.map((page) => (
            <li
              key={page}
              className={
                currentPage === page ? 'page-item active' : 'page-item'
              }
            >
              <a className='page-link' onClick={() => onPageChange(page)}>
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
