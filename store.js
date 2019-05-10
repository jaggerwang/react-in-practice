import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import reducer from './reducers'

export function makeStore(initialState, { isServer }) {
  initialState = initialState || reducer()

  const middlewares = [thunk, logger]
  const enhancer = composeWithDevTools(applyMiddleware(...middlewares))

  if (isServer) {
    return createStore(reducer, initialState, enhancer)
  } else {
    const { persistReducer, persistStore } = require('redux-persist')
    const storage = require('redux-persist/lib/storage').default

    const persistedReducer = persistReducer({
      key: 'jwpay',
      whitelist: ['common', 'form', 'account'],
      storage,
    }, reducer)
    const store = createStore(persistedReducer, initialState, enhancer)

    store.__persistor = persistStore(store)

    return store
  }
}
