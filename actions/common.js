import Router from 'next/router'

import { showMessage, JWPApiResponse, loginUrl } from '../lib'

export const RESET_ACTION = 'RESET_ACTION'

export const resetAction = () => {
  return {
    type: RESET_ACTION,
  }
}

export function handleActionError({ isInitial = false, error, res }) {
  if (error instanceof JWPApiResponse) {
    if (isInitial) {
      const actionError = { type: error.status, desc: error.message }
      if (res) {
        res.statusCode = error.status
        res.actionError = actionError
      }
      return { actionError }
    } else {
      if (error.status === 401) {
        Router.replace(loginUrl())
      } else {
        showMessage(error.message)
      }
      return
    }
  }

  if (isInitial) {
    const actionError = { type: 500, desc: `${error}` }
    if (res) {
      res.actionError = actionError
    }
    return { actionError }
  } else {
    showMessage(`${error}`)
  }
}
