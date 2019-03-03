import {takeLatest, all, put, call, select} from 'redux-saga/effects'
import * as beerActionsTypes from './beerActionTypes'
import {beersFound} from './beerActions'

const apiRoot = 'https://api.punkapi.com/v2'

async function fetchBeers (name, page) {
  const pageParam = `?page=${page}`;
  const nameParam = name ? `&beer_name=${name}` : ''
  const response = await fetch(`${apiRoot}/beers${pageParam}${nameParam}`);
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

export default function * beersSaga() {
  yield all([
    takeLatest(beerActionsTypes.GET_BEERS, getBeers)
  ]);
}