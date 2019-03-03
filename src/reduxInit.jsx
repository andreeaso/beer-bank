import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import {combineReducers} from 'redux';
import {beerActionsHandler} from './actions/beerActions';
import beersSaga from './actions/beersSaga';

const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
  beerBank: beerActionsHandler
})


const composeEnhancers = compose;
export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(sagaMiddleware, thunk))
);

sagaMiddleware.run(beersSaga);