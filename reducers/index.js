import { combineReducers } from 'redux'

import { RESET_ACTION } from '../actions'
import account from './account'
import common from './common'
import form from './form'


const reducer = combineReducers({
  account,
  common,
  form,
})

const initialState = reducer()

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case RESET_ACTION:
      return initialState
    default:
      return reducer(state, action)
  }
}
