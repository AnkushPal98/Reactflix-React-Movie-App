import React, { useState } from 'react';
import { fetchMovieDetails } from '../../redux/actions/movieActions';
import './MovieCard.css';
import { Modal } from 'react-bootstrap';

function MovieCard({ movie }) {
  const [showModal, setShowModal] = useState(false);
  const [movieData, setMovieData] = useState({});

  const onCardCliked = (movie) => {
    (async () => {
      const data = await fetchMovieDetails(movie.Title);
      // console.log('movie data: ', data);
      setShowModal(true);
      setMovieData(data);
    })();
  };

  return (
    <>
      <div className='card' onClick={() => onCardCliked(movie)}>
        <img
          src={movie.Poster}
          className='card-image-top'
          alt={`${movie.Title} poster`}
        />
        <div className='card-body'>
          <p className='card-text'>{movie.Title}</p>
          <p className='card-text'>{movie.Year}</p>
        </div>
      </div>

      {/* modal */}
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='movie-modal'
      >
        <Modal.Header closeButton>
          <Modal.Title id='movie-modal'>{movieData.Title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className='col-md-auto'>
              <img src={movieData.Poster} alt={movieData.Title} />
            </div>
            <div className='col'>
              <div className='container-fluid'>
                <ul className='list-group list-group-flush'>
                  <li className='list-group-item'>
                    <strong>Director: </strong>
                    {movieData.Director}
                  </li>
                  <li className='list-group-item'>
                    <strong>Plot: </strong>
                    {movieData.Plot}
                  </li>
                  <li className='list-group-item'>
                    <strong>Year: </strong>
                    {movieData.Year}
                  </li>
                  <li className='list-group-item'>
                    <strong>Language: </strong>
                    {movieData.Language}
                  </li>
                  <li className='list-group-item'>
                    <strong>Writer: </strong>
                    {movieData.Writer}
                  </li>
                  <li className='list-group-item'>
                    <strong>Awards: </strong>
                    {movieData.Awards}
                  </li>
                  <li className='list-group-item'>
                    <strong>Genre: </strong>
                    {movieData.Genre}
                  </li>
                  <li className='list-group-item'>
                    <strong>Actors: </strong>
                    {movieData.Actors}
                  </li>
                  <li className='list-group-item'>
                    <strong>BoxOffice: </strong>
                    {movieData.BoxOffice}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default MovieCard;
