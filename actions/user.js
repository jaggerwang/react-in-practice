import { JWPApiService } from '../lib'

export const getUserInfo = ({ jwpApiService, id } = {}) =>
  dispatch => {
    jwpApiService = jwpApiService || new JWPApiService()
    return jwpApiService.get('/user/info', {
      id
    })
  }
