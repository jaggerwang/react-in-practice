import { JWPApiService } from '../lib'

export const publishTaskAction = ({ title, desc, coverFileId, payAmount,
  startAt, stopAt, text, link, credentials } = {}) =>
  dispatch => {
    const jwpApiService = new JWPApiService()
    return jwpApiService.post('/task/publish', {
      title, desc, coverFileId, payAmount, startAt, stopAt, text, link,
      credentials
    })
  }

export const editTaskAction = ({ id, title, desc, coverFileId, payAmount,
  startAt, stopAt, text, link, credentials, status } = {}) =>
  dispatch => {
    const jwpApiService = new JWPApiService()
    return jwpApiService.post('/task/edit', {
      id, title, desc, coverFileId, payAmount, startAt, stopAt, text, link,
      credentials, status
    })
  }

export const getTaskInfoAction = ({ jwpApiService, id } = {}) =>
  dispatch => {
    jwpApiService = jwpApiService || new JWPApiService()
    return jwpApiService.get('/task/info', {
      id
    })
  }

export const payTaskAction = ({ id, payPlatform, payAmount } = {}) =>
  dispatch => {
    const jwpApiService = new JWPApiService()
    return jwpApiService.post('/task/pay', {
      id, payPlatform, payAmount
    })
  }

export const commentTaskAction = ({ taskId, score, text } = {}) =>
  dispatch => {
    const jwpApiService = new JWPApiService()
    return jwpApiService.post('/task/comment', {
      taskId, score, text
    })
  }

export const getTaskCommentsAction = ({ jwpApiService, taskId, limit, offset } = {}) =>
  dispatch => {
    jwpApiService = jwpApiService || new JWPApiService()
    return jwpApiService.get('/task/comments/of/tasks', {
      taskId, limit, offset
    })
  }

export const getHotTasksAction = ({ jwpApiService, limit, offset } = {}) =>
  dispatch => {
    jwpApiService = jwpApiService || new JWPApiService()
    return jwpApiService.get('/task/hot', {
      limit, offset
    })
  }

export const getPublishedTasksAction = ({ jwpApiService, userId, limit, offset
} = {}) =>
  dispatch => {
    jwpApiService = jwpApiService || new JWPApiService()
    return jwpApiService.get('/task/published', {
      userId, limit, offset
    })
  }

export const getTaskCommentsOfPublishedTasksAction = ({ jwpApiService, userId, limit,
  offset } = {}) =>
  dispatch => {
    jwpApiService = jwpApiService || new JWPApiService()
    return jwpApiService.get('/task/comments/of/published/tasks', {
      userId, limit, offset
    })
  }
