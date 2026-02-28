import { thunk } from 'redux-thunk';
import { Tuple, configureStore } from '@reduxjs/toolkit';
import { Action, Middleware, applyMiddleware, createStore } from 'redux';
import { rootReducer } from '../reducers/rootReducer';
import logger from 'redux-logger';
import { composeWithDevTools } from '@redux-devtools/extension';
import promiseMiddleware from 'redux-promise-middleware';

export type RootState = ReturnType<typeof rootReducer>;
export const makeStore = () => {
  const middlewares = [thunk, logger, promiseMiddleware];
  return createStore(
    rootReducer,
    {},
    composeWithDevTools(applyMiddleware(...middlewares))
  );
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
