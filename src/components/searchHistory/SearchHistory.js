import React, { useEffect, useState } from 'react';
import {
  DropdownButton,
  Dropdown,
  CloseButton,
  NavDropdown,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteSearchHistory,
  getSearchedMovie,
} from '../../redux/actions/movieActions';
import './SearchHistory.css';

function SearchHistory() {
  const state = useSelector((store) => store?.movieReducer);
  const dispatch = useDispatch();
  const [searchKeys, setSearchKeys] = useState([]);

  useEffect(() => {
    let _searchKeys = [];
    for (let d of state.data) {
      _searchKeys.push(d.searchKey);
    }
    console.log('search history: ', _searchKeys);
    setSearchKeys(_searchKeys);
  }, [state]);

  const onSearchKeyClicked = (searchKey) => {
    // console.log('clicked on search history', searchKey);
    (async () => {
      dispatch(await getSearchedMovie(searchKey));
    })();
  };

  const onDeleteHistory = (searchKey) => {
    // console.log('history to be deleted is: ', searchKey);
    if (window.confirm('Are you sure want to delete?')) {
      (async () => {
        dispatch(await deleteSearchHistory(searchKey));
      })();
    }
  };

  const dropDownItems = searchKeys.map((searchKey) => (
    <NavDropdown.Item key={searchKey}>
      <div className='row'>
        <div className='col-6' onClick={() => onSearchKeyClicked(searchKey)}>
          {searchKey}
        </div>
        <div className='col'>
          <CloseButton
            onClick={() => onDeleteHistory(searchKey)}
            className='history-close-btn'
          />
        </div>
      </div>
    </NavDropdown.Item>
  ));

  return (
    <div>
      <NavDropdown
        id='nav-dropdown-dark-example'
        title='History'
        menuVariant='light'
      >
        {dropDownItems.length > 0 ? dropDownItems : 'No search history'}
      </NavDropdown>
    </div>
  );
}

export default SearchHistory;
