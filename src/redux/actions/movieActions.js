import axios from 'axios';
import { type } from '../types';

const BASE_URL = 'https://www.omdbapi.com/?apikey=aa9e49f';
const paramsKey = {
  SEARCH: '&s=',
  TITLE: '&t=',
  TYPE: '&type=',
  PAGE: '&page=',
};

export async function searchMovies(searchKey) {
  const _url = BASE_URL + paramsKey.SEARCH + searchKey;
  // const url = 'http://www.omdbapi.com/?apikey=aa9e49f&s=kill';
  const response = await axios.get(_url);
  const { Search: data } = response.data;

  return { type: type.SEARCH_MOVIES, searchKey: searchKey, payload: data };
}

export async function fetchMovieDetails(title) {
  const _url = BASE_URL + paramsKey.TITLE + title;
  const response = await axios.get(_url);
  const { data } = response;
  return data;
}

export async function getSearchedMovie(searchKey) {
  return { type: type.GET_SEARCHED_MOVIE, searchKey: searchKey };
}

export async function deleteSearchHistory(searchKey) {
  return { type: type.DELETE_SEARCH_HISTORY, searchKey: searchKey };
}
