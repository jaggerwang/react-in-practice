import { SAVE_FORM, REMOVE_FORM_FIELDS, RESET_FORM } from '../actions'

const initialState = {}

export default (state = initialState, action = {}) => {
  const { type, ...payload } = action
  Object.keys(payload).forEach(k => payload[k] === undefined && delete payload[k])

  switch (type) {
    case SAVE_FORM: {
      const { name, changedFields } = payload

      const oldFields = state[name] || {}
      return Object.assign({ ...state }, {
        [name]: Object.assign({ ...oldFields }, changedFields),
      })
    }
    case REMOVE_FORM_FIELDS: {
      const { name, removeFields } = payload

      const oldFields = state[name] || {}
      const fields = {}
      Object.entries(oldFields).forEach(([k, v]) => {
        if (removeFields.indexOf(k) === -1) {
          fields[k] = v
        }
      })
      return Object.assign({ ...state }, {
        [name]: fields,
      })
    }
    case RESET_FORM:
      const { name } = payload

      return Object.assign({ ...state }, { [name]: {} })
    default:
      return state
  }
}