import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import reducer from './reducers'

export function makeStore(initialState) {
  initialState = initialState || reducer()

  const middlewares = [thunk, logger]
  const enhancer = composeWithDevTools(applyMiddleware(...middlewares))

  return createStore(reducer, initialState, enhancer)
}
