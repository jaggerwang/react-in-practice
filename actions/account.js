import { JWPApi } from '../lib'
import { resetAction } from './common'

export const SET_ACCOUNT_INFO_ACTION = 'SET_ACCOUNT_INFO_ACTION'

export const setAccountInfoAction = ({ user }) => {
  return {
    type: SET_ACCOUNT_INFO_ACTION,
    user,
  }
}

export const getAccountInfoAction = ({ jwpApi } = {}) =>
  dispatch => {
    jwpApi = jwpApi || new JWPApi()
    return jwpApi.get('/account/info')
      .then(resp => {
        const { user } = resp.data
        dispatch(setAccountInfoAction({ user }))
        return resp
      })
  }

export const registerAction = ({ username, password } = {}
) =>
  dispatch => {
    const jwpApi = new JWPApi()
    return jwpApi.post('/account/register', {
      username, password
    })
  }

export const loginAction = ({ username, password } = {}) =>
  dispatch => {
    const jwpApi = new JWPApi()
    return jwpApi.post('/account/login', {
      username, password
    })
      .then(async resp => {
        await dispatch(getAccountInfoAction())
        return resp
      })
  }

export const logoutAction = () =>
  dispatch => {
    const jwpApi = new JWPApi()
    return jwpApi.get('/account/logout')
      .then(resp => {
        dispatch(resetAction())
        return resp
      })
  }

export const editAccountAction = ({ username, password, avatarFileId,
  coverFileId, intro } = {}) =>
  dispatch => {
    const jwpApi = new JWPApi()
    return jwpApi.post('/account/edit', {
      username, password, avatarFileId, coverFileId, intro
    })
      .then(async resp => {
        await dispatch(getAccountInfoAction())
        return resp
      })
  }
