import {takeLatest, all, put, call, select} from 'redux-saga/effects'
import * as beerActionsTypes from './beerActionTypes'
import {beersFound, searchBeersSuccess} from './beerActions'

const apiRoot = 'https://api.punkapi.com/v2'

async function fetchBeers (name, page) {
  const pageParam = `?page=${page}`;
  const nameParam = name ? `&beer_name=${name}` : ''
  const response = await fetch(`${apiRoot}/beers${pageParam}${nameParam}`);
  const result = await response.json();
  return result;
}

async function advancedSearch (searchData) {
  const params = [];
  addSearchParam(params, 'ibu_lt', searchData.maxIBU);
  addSearchParam(params, 'ibu_gt', searchData.minIBU);
  addSearchParam(params, 'abv_lt', searchData.maxABV);
  addSearchParam(params, 'abv_gt', searchData.minABV);
  addSearchParam(params, 'ebc_lt', searchData.maxEBC);
  addSearchParam(params, 'ebc_gt', searchData.minEBC);
  addSearchParam(params, 'brewed_before', getDate(searchData.brewedBefore));
  addSearchParam(params, 'brewed_after', getDate(searchData.brewedAfter));

  const query = params.length > 0 ? `?${params.join('&')}` : '';
  console.log('searching query ', query);

  const response = await fetch(`${apiRoot}/beers${query}`);
  const result = await response.json();
  return result;
}

export function * getBeers({payload}) {
  try {
      const state = yield select(state => state.beerBank);
      const beers = yield call(fetchBeers, payload.name, payload.page);
      if(payload.name === state.searchTerm) {
        yield put(beersFound({beers: state.beers.concat(beers), new: beers.length, searchTerm: payload.name}))
      } else {
        yield put(beersFound({beers: beers, new: beers.length, searchTerm: payload.name}))
      }
      
  } catch(e) {
    console.log(e);
  }
}

export function * searchBeers({searchData}) {
  try {
    const beers = yield call(advancedSearch, searchData);
    yield put(searchBeersSuccess(beers));
  } catch(e) {
    console.log(e);
  }
}

export default function * beersSaga() {
  yield all([
    takeLatest(beerActionsTypes.GET_BEERS, getBeers),
    takeLatest(beerActionsTypes.SEARCH_BEERS, searchBeers)
  ]);
}

function addSearchParam(params, paramName, value) {
    if(value) {
      params.push(`${paramName}=${value}`);
    }
}

function getDate(date) {
  return date ? `${date.getMonth() + 1}-${date.getYear()}` : undefined;
}