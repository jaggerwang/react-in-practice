import { showMessage, JWPApiResponse, needLogin } from '../lib'

export const RESET_ACTION = 'RESET_ACTION'

export const resetAction = () => {
  return {
    type: RESET_ACTION,
  }
}

export function handleActionError(error) {
  if (error instanceof JWPApiResponse) {
    if (error.status === 401) {
      needLogin()
    } else {
      showMessage(error.message)
    }
  } else {
    showMessage(`${error}`)
  }
}
