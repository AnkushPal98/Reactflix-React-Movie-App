import React from 'react';
import SearchBar from '../searchBar/SearchBar';

function NavBar() {
  return (
    <>
      <nav className='navbar  fixed-top navbar-dark bg-dark'>
        <div className="container-fluid">
          <a onClick={() => window.location.reload()} className="navbar-brand">
            Movie Browser
          </a>
          <SearchBar />
        </div>
      </nav>
    </>
  );
}

export default NavBar;
