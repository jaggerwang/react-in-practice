import { combineReducers } from 'redux'

import account from './account'
import common from './common'
import form from './form'


const reducer = combineReducers({
  account,
  common,
  form,
})

export default reducer
