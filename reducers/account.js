import { SET_ACCOUNT_INFO_ACTION } from '../actions'

const initialState = {
  "user": {
    "id": 0,
    "avatarFileId": 0,
    "avatarFile": {
      "id": 0,
      "thumbUrls": {},
    },
    "coverFileId": 0,
    "coverFile": {
      "id": 0,
      "thumbUrls": {},
    },
  },
}

export default (state = initialState, action = {}) => {
  const { type, ...payload } = action
  Object.keys(payload).forEach(k => payload[k] === undefined && delete payload[k])

  switch (type) {
    case SET_ACCOUNT_INFO_ACTION:
      return Object.assign({ ...state }, payload)
    default:
      return state
  }
}