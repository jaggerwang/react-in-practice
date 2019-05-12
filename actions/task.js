import { JWPApi } from '../lib/api'

export const publishTaskAction = ({ title, desc, coverFileId, payAmount,
  startAt, stopAt, text, link, credentials } = {}) =>
  dispatch => {
    const jwpApi = new JWPApi()
    return jwpApi.post('/task/publish', {
      title, desc, coverFileId, payAmount, startAt, stopAt, text, link,
      credentials
    })
  }

export const editTaskAction = ({ id, title, desc, coverFileId, payAmount,
  startAt, stopAt, text, link, credentials, status } = {}) =>
  dispatch => {
    const jwpApi = new JWPApi()
    return jwpApi.post('/task/edit', {
      id, title, desc, coverFileId, payAmount, startAt, stopAt, text, link,
      credentials, status
    })
  }

export const getTaskInfoAction = ({ jwpApi, id } = {}) =>
  dispatch => {
    jwpApi = jwpApi || new JWPApi()
    return jwpApi.get('/task/info', {
      id
    })
  }

export const payTaskAction = ({ id, payPlatform, payAmount } = {}) =>
  dispatch => {
    const jwpApi = new JWPApi()
    return jwpApi.post('/task/pay', {
      id, payPlatform, payAmount
    })
  }

export const commentTaskAction = ({ taskId, score, text } = {}) =>
  dispatch => {
    const jwpApi = new JWPApi()
    return jwpApi.post('/task/comment', {
      taskId, score, text
    })
  }

export const getTaskCommentsAction = ({ jwpApi, taskId, limit, offset } = {}) =>
  dispatch => {
    jwpApi = jwpApi || new JWPApi()
    return jwpApi.get('/task/comments/of/tasks', {
      taskId, limit, offset
    })
  }

export const getHotTasksAction = ({ jwpApi, limit, offset } = {}) =>
  dispatch => {
    jwpApi = jwpApi || new JWPApi()
    return jwpApi.get('/task/hot', {
      limit, offset
    })
  }

export const getPublishedTasksAction = ({ jwpApi, userId, limit, offset
} = {}) =>
  dispatch => {
    jwpApi = jwpApi || new JWPApi()
    return jwpApi.get('/task/published', {
      userId, limit, offset
    })
  }

export const getTaskCommentsOfPublishedTasksAction = ({ jwpApi, userId, limit,
  offset } = {}) =>
  dispatch => {
    jwpApi = jwpApi || new JWPApi()
    return jwpApi.get('/task/comments/of/published/tasks', {
      userId, limit, offset
    })
  }
