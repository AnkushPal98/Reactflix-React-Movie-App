import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchMovies } from '../../redux/actions/movieActions';
import SearchHistory from '../searchHistory/SearchHistory';

function SearchBar() {
  const dispatch = useDispatch();
  const [searchKey, setSearchKey] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('searchKey: ', searchKey);
    if (searchKey !== '' && searchKey !== undefined)
      (async () => {
        dispatch(await searchMovies(searchKey));
      })();

    setSearchKey('');
  };

  const handleChannge = (event) => {
    // console.log('search key is: ', event.target.value);
    setSearchKey(event.target.value);
  };

  return (
    <>
      <form className='d-flex' onSubmit={handleSubmit}>
        <input
          className='form-control me-2'
          type='search'
          placeholder='search movie title'
          aria-label='Search'
          onChange={handleChannge}
          value={searchKey}
        />
        <button className='btn btn-outline-success' type='submit'>
          Search
        </button>

        {/* history drop down (using react bootstrap) */}
        <SearchHistory />
      </form>
    </>
  );
}

export default SearchBar;
