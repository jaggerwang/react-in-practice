import { JWPApi } from '../lib/api'

export const getUserInfo = ({ jwpApi, id } = {}) =>
  dispatch => {
    jwpApi = jwpApi || new JWPApi()
    return jwpApi.get('/user/info', {
      id
    })
  }
