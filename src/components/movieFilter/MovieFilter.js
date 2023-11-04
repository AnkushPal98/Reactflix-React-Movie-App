import React, { useEffect, useState } from 'react';
import Pagination from '../pagination/Pagination';

function MovieFilter(props) {
  const {
    onFilterMovies,
    onFilterSeries,
    onFilterTvShows,
    content,
    itemsCount,
    currentPage,
    pageSize,
    onPageChange,
  } = props;
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {}, [showFilter]);

  const onFilterBtnClicked = () => {
    setShowFilter(!showFilter);
    console.log('filter: ', showFilter);
  };

  const filterOptions = (
    <section>
      <button className='btn btn-link' onClick={onFilterMovies}>
        Movies
      </button>
      <button className='btn btn-link' onClick={onFilterSeries}>
        Series
      </button>
      <button className='btn btn-link' onClick={onFilterTvShows}>
        Tv Shows
      </button>
      {/* select pagesize */}
    </section>
  );

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexWrap: 'inherit',
          alignContent: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'inherit' }}>
          <div>
            <button
              className='btn btn-outline-secondary'
              type='button'
              onClick={onFilterBtnClicked}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                fill='currentColor'
                class='bi bi-filter'
                viewBox='0 0 16 16'
              >
                <path d='M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z' />
              </svg>
            </button>
          </div>
          {showFilter ? filterOptions : null}
        </div>

        <div>
          <Pagination
            itemsCount={itemsCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        </div>
        <div>
          <p>
            Total Number of {content.type} is{' '}
            <span className='badge bg-dark p-1'>{content.count}</span>
          </p>
        </div>
      </div>
    </>
  );
}

export default MovieFilter;
