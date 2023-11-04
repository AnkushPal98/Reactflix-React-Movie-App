import { type } from '../types';

function isRepeated(key, data) {
  for (let d of data) {
    if (d.searchKey === key) return true;
  }
  return false;
}

function movieReducer(state = { data: [], currentSearchKey: '' }, action) {
  console.log('movieReducer is called');

  switch (action.type) {
    case type.SEARCH_MOVIES: {
      console.log('action: ', action);

      // check and prevent dupicate search keys
      if (!isRepeated(action.searchKey, state.data)) {
        const newData = {
          searchKey: action.searchKey,
          movies: action.payload,
        };

        const currentData = [...state.data];
        currentData.push(newData);
        state.data = [...currentData];
        state.currentSearchKey = action.searchKey;
      }

      return { ...state };
    }
    case type.GET_SEARCHED_MOVIE: {
      const currentState = { ...state };
      currentState.currentSearchKey = action.searchKey;
      state = { ...currentState };

      return { ...state };
    }
    case type.DELETE_SEARCH_HISTORY: {
      const currentData = [...state.data];
      const indexToDelete = currentData.findIndex(
        (d) => d.searchKey === action.searchKey
      );
      if (indexToDelete > -1) {
        currentData.splice(indexToDelete, 1);
        state.data = [...currentData];
      }
      return { ...state };
    }
    default: {
      return { ...state };
    }
  }
}

export default movieReducer;
