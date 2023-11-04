import React from 'react';
import { useEffect, useState } from 'react';
import MovieCard from '../movieCard/MovieCard';
import MovieFilter from '../movieFilter/MovieFilter';
import './MovieList.css';
import { useSelector } from 'react-redux';
import { paginate } from '../../utils/paginate';

const FILTER_TYPE = {
  SEARCH_RESULT: 'Search Result',
  MOVIE: 'Movies',
  SERIES: 'Series',
  TV_SHOWS: 'Tv Shows',
};

const PAGE_SIZE = 8;

function MovieList() {
  const state = useSelector((store) => store?.movieReducer);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsCount, setItemsCount] = useState(0);
  const [movieCards, setMovieCrads] = useState({
    cards: [],
    type: '',
    count: 0,
  });

  useEffect(() => {
    let _movies = [];
    for (let d of state.data) {
      if (state.currentSearchKey === d.searchKey) {
        _movies.push(d.movies);
      }
    }
    setMovies(_movies[0]);
    setItemsCount(movies?.length);
    createMovieCards(movies, FILTER_TYPE.SEARCH_RESULT);
  }, [state, movies, currentPage]);

  const filterMovies = () => {
    const _typeMovies = movies.filter((m) => m.Type === 'movie');
    setItemsCount(_typeMovies.length);
    createMovieCards(_typeMovies, FILTER_TYPE.MOVIE);
  };

  const filterSeries = () => {
    const _typeSeries = movies.filter((m) => m.Type === 'series');
    setItemsCount(_typeSeries.length);
    createMovieCards(_typeSeries, FILTER_TYPE.SERIES);
  };

  const filterTvShows = () => {
    const _typeTvShows = movies.filter((m) => m.Type === 'episode');
    setItemsCount(_typeTvShows.length);
    createMovieCards(_typeTvShows, FILTER_TYPE.TV_SHOWS);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const setErrorMessageUtil = (filterType) => {
    switch (filterType) {
      case FILTER_TYPE.MOVIE: {
        setErrorMessage(
          <div>
            <div className='alert alert-danger'>No Movies Found!</div>
          </div>
        );
        break;
      }
      case FILTER_TYPE.SERIES: {
        console.log('series');
        setErrorMessage(
          <div>
            <div className='alert alert-danger'>No Series Found!</div>
          </div>
        );
        break;
      }
      case FILTER_TYPE.TV_SHOWS: {
        console.log('tv shows');
        setErrorMessage(
          <div>
            <div className='alert alert-danger'>No Tv Shows Found!</div>
          </div>
        );
        break;
      }
      default: {
        setErrorMessage(
          <div>
            <div className='alert alert-danger'>Search Result Not Found!</div>
          </div>
        );
        break;
      }
    }
  };

  const createMovieCards = (_filteredContent, _filterType = undefined) => {
    if (movies?.length > 0) {
      console.log('filterd contents: ', _filteredContent);
      if (_filteredContent.length > 0) {
        const _paginatedContent = paginate(
          _filteredContent,
          currentPage,
          PAGE_SIZE
        );
        const _movieCards = _paginatedContent?.map((movie) => (
          <div key={movie.imdbID} className='col'>
            <MovieCard movie={movie} />
          </div>
        ));
        setMovieCrads({
          cards: _movieCards,
          type: _filterType,
          count: _movieCards.length,
        });
      } else {
        setMovieCrads({
          cards: [],
          type: _filterType,
          count: 0,
        });
        setErrorMessageUtil(_filterType);
      }
    } else {
      // display error message only if movies searched is not found
      if (state.currentSearchKey !== '') {
        setMovieCrads({
          cards: [],
          type: _filterType,
          count: 0,
        });
        setErrorMessageUtil(_filterType);
      }
    }
  };

  const displayMovieFilter = () => (
    <MovieFilter
      onFilterMovies={filterMovies}
      onFilterSeries={filterSeries}
      onFilterTvShows={filterTvShows}
      itemsCount={itemsCount}
      currentPage={currentPage}
      pageSize={PAGE_SIZE}
      content={movieCards}
      onPageChange={handlePageChange}
    />
  );

  return (
    <>
      <div>
        {movies !== undefined && displayMovieFilter()}

        <div className='row row-col row-cols-md-4 g-4'>
          {movieCards.cards?.length > 0 ? movieCards.cards : errorMessage}
          {/* {movieCards} */}
        </div>
      </div>
    </>
  );
}

export default MovieList;
