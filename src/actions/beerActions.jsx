import {handleActions} from 'redux-actions'
import * as types from './beerActionTypes'

export const getBeers = (payload) => ({type: types.GET_BEERS, payload});
export const beersFound = (payload) => ({type: types.BEERS_REQUEST_SUCCESS, payload});
export const addFavourite = (item) => ({type: types.ADD_FAVOURITE, item});
export const removeFavourite = (item) => ({type: types.REMOVE_FAVOURITE, item});
export const searchBeers = (searchData) => ({type: types.SEARCH_BEERS, searchData});
export const searchBeersSuccess = (beers) => ({type: types.SEARCH_BEERS_SUCCESS, beers});

export const beerActionsHandler = handleActions({
  [types.BEERS_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    beers: action.payload.beers,
    hasMore: action.payload.new > 0,
    searchTerm: action.payload.searchTerm
  }),
  [types.GET_BEERS]: (state, action) => ({
    ...state,
    page: action.payload.page
  }),
  [types.ADD_FAVOURITE]: (state, action) => ({
    ...state,
    favourites: state.favourites.concat(action.item)
  }),
  [types.REMOVE_FAVOURITE]: (state, action) => ({
    ...state,
    favourites: state.favourites.filter(item => item.id !== action.item.id)
  }),
  [types.SEARCH_BEERS_SUCCESS]: (state, action) => ({
    ...state,
    advancedSearchResults: action.beers
  })
}, {beers: [], page: 0, hasMore: true, searchTerm: '', favourites: [], advancedSearchResults: []})