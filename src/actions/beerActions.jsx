import {handleActions} from 'redux-actions'
import * as types from './beerActionTypes'

export const getBeers = (payload) => ({type: types.GET_BEERS, payload});
export const beersFound = (payload) => ({type: types.BEERS_REQUEST_SUCCESS, payload});
export const addFavourite = (item) => ({type: types.ADD_FAVOURITE, item});
export const removeFavourite = (item) => ({type: types.REMOVE_FAVOURITE, item});
export const searchBeers = (searchData) => ({type: types.SEARCH_BEERS, searchData});
export const searchBeersSuccess = (beers) => ({type: types.SEARCH_BEERS_SUCCESS, beers});
export const openDetailsModal = (beer) => ({type: types.SHOW_DETAILS_MODAL, beer});
export const closeDetailsModal = () => ({type: types.CLOSE_DETAILS_MODAL});
export const foundSimilarBeers = (beers) => ({type: types.FOUND_SIMIAR_BEERS, beers});

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
  }),
  [types.SHOW_DETAILS_MODAL]: (state, action) => ({
    ...state,
    modal: {
      isOpen: true,
      beer: action.beer,
      isFetchingSimilarBeers: true
    }
  }),
  [types.CLOSE_DETAILS_MODAL]: (state) => ({
    ...state,
    modal: {
      isOpen: false,
      beer: {}
    }
  }),
  [types.FOUND_SIMIAR_BEERS]: (state, action) => ({
    ...state,
    modal: {
      ...state.modal,
      similarBeers: action.beers,
      isFetchingSimilarBeers: false
    }
  })
}, {
  beers: [],
  page: 0,
  hasMore: true,
  searchTerm: '',
  favourites: [],
  advancedSearchResults: [],
  modal: {
    isOpen: false,
    beer: {},
    isFetchingSimilarBeers: false,
    similarBeers: []
  }
})