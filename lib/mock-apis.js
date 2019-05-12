import urlPackage from 'url'

const files = {
  1: {
    "id": 1,
    "userId": 1,
    "url": "/static/img/avatar-1.png",
    "thumbUrls": {
      "large": "/static/img/avatar-1.png",
      "middle": "/static/img/avatar-1.png",
      "small": "/static/img/avatar-1.png"
    },
    "createdAt": "2019-04-23T15:30:25+08:00",
    "updatedAt": "2019-04-23T15:30:25+08:00"
  },
  2: {
    "id": 2,
    "userId": 1,
    "url": "/static/img/bg-1.jpg",
    "thumbUrls": {
      "large": "/static/img/bg-1.jpg",
      "middle": "/static/img/bg-1.jpg",
      "small": "/static/img/bg-1.jpg"
    },
    "createdAt": "2019-04-23T15:30:25+08:00",
    "updatedAt": "2019-04-23T15:30:25+08:00"
  },
  3: {
    "id": 3,
    "userId": 1,
    "url": "/static/img/cover-1.jpg",
    "thumbUrls": {
      "large": "/static/img/cover-1.jpg",
      "middle": "/static/img/cover-1.jpg",
      "small": "/static/img/cover-1.jpg"
    },
    "createdAt": "2019-04-23T15:30:25+08:00",
    "updatedAt": "2019-04-23T15:30:25+08:00"
  },
  4: {
    "id": 4,
    "userId": 1,
    "url": "/static/img/cover-2.jpg",
    "thumbUrls": {
      "large": "/static/img/cover-2.jpg",
      "middle": "/static/img/cover-2.jpg",
      "small": "/static/img/cover-2.jpg"
    },
    "createdAt": "2019-04-23T15:30:25+08:00",
    "updatedAt": "2019-04-23T15:30:25+08:00"
  },
  5: {
    "id": 5,
    "userId": 1,
    "url": "/static/img/cover-3.jpg",
    "thumbUrls": {
      "large": "/static/img/cover-3.jpg",
      "middle": "/static/img/cover-3.jpg",
      "small": "/static/img/cover-3.jpg"
    },
    "createdAt": "2019-04-23T15:30:25+08:00",
    "updatedAt": "2019-04-23T15:30:25+08:00"
  },
  6: {
    "id": 6,
    "userId": 1,
    "url": "/static/img/cover-4.jpg",
    "thumbUrls": {
      "large": "/static/img/cover-4.jpg",
      "middle": "/static/img/cover-4.jpg",
      "small": "/static/img/cover-4.jpg"
    },
    "createdAt": "2019-04-23T15:30:25+08:00",
    "updatedAt": "2019-04-23T15:30:25+08:00"
  },
}

const users = {
  1: {
    "id": 1,
    "email": "demo@mg.jwpay.app",
    "username": "天火",
    "avatarFileId": 1,
    "coverFileId": 2,
    "intro": "Coding for Free",
    "createdAt": "2019-02-12T14:28:09+08:00",
    "updatedAt": "2019-04-25T10:38:51+08:00",
    "avatarFile": files[1],
    "coverFile": files[2],
  },
}

const tasks = {
  1: {
    "id": 1,
    "userId": 1,
    "title": "开通叽歪论坛会员服务（一个月）",
    "desc": "付费完成此任务可开通叽歪论坛（https://forum.jwcourse.com/）会员，会员可在受限分类下发帖。",
    "coverFileId": 3,
    "payAmount": 1000,
    "startAt": "2019-04-19T00:00:00+08:00",
    "stopAt": "2019-07-10T23:59:59+08:00",
    "text": "请在 Webhook 请求参数里填写你的叽歪论坛用户名并执行调用，调用成功后即可自动开通会员。",
    "link": "https://forum.jwcourse.com/",
    "credentials": "ynxn",
    "status": "pending",
    "createdAt": "2019-04-18T11:36:28+08:00",
    "updatedAt": "2019-04-23T15:41:29+08:00",
    "user": users[1],
    "coverFile": files[3],
  },
  2: {
    "id": 2,
    "userId": 1,
    "title": "开通叽歪论坛会员服务（三个月）",
    "desc": "付费完成此任务可开通叽歪论坛（https://forum.jwcourse.com/）会员，会员可在受限分类下发帖。",
    "coverFileId": 4,
    "payAmount": 1000,
    "startAt": "2019-04-19T00:00:00+08:00",
    "stopAt": "2019-07-10T23:59:59+08:00",
    "text": "请在 Webhook 请求参数里填写你的叽歪论坛用户名并执行调用，调用成功后即可自动开通会员。",
    "link": "https://forum.jwcourse.com/",
    "credentials": "ynxn",
    "status": "pending",
    "createdAt": "2019-04-18T11:36:28+08:00",
    "updatedAt": "2019-04-23T15:41:29+08:00",
    "user": users[1],
    "coverFile": files[4],
  },
  3: {
    "id": 3,
    "userId": 1,
    "title": "开通叽歪论坛会员服务（半年）",
    "desc": "付费完成此任务可开通叽歪论坛（https://forum.jwcourse.com/）会员，会员可在受限分类下发帖。",
    "coverFileId": 5,
    "payAmount": 5400,
    "startAt": "2019-04-19T00:00:00+08:00",
    "stopAt": "2019-07-10T23:59:59+08:00",
    "text": "请在 Webhook 请求参数里填写你的叽歪论坛用户名并执行调用，调用成功后即可自动开通会员。",
    "link": "https://forum.jwcourse.com/",
    "credentials": "ynxn",
    "status": "pending",
    "createdAt": "2019-04-18T11:36:28+08:00",
    "updatedAt": "2019-04-23T15:41:29+08:00",
    "user": users[1],
    "coverFile": files[5],
  },
  4: {
    "id": 4,
    "userId": 1,
    "title": "开通叽歪论坛会员服务（一年）",
    "desc": "付费完成此任务可开通叽歪论坛（https://forum.jwcourse.com/）会员，会员可在受限分类下发帖。",
    "coverFileId": 6,
    "payAmount": 9600,
    "startAt": "2019-04-19T00:00:00+08:00",
    "stopAt": "2019-07-10T23:59:59+08:00",
    "text": "请在 Webhook 请求参数里填写你的叽歪论坛用户名并执行调用，调用成功后即可自动开通会员。",
    "link": "https://forum.jwcourse.com/",
    "credentials": "ynxn",
    "status": "pending",
    "createdAt": "2019-04-18T11:36:28+08:00",
    "updatedAt": "2019-04-23T15:41:29+08:00",
    "user": users[1],
    "coverFile": files[6],
  },
}

const comments = [
  {
    "id": 1,
    "taskId": 1,
    "userId": 1,
    "score": 50,
    "text": "付费完成输入用户名后就立即开通了，赞！",
    "createdAt": "2019-04-18T11:36:28+08:00",
    "updatedAt": "2019-04-23T15:41:29+08:00",
    "user": users[1],
  },
  {
    "id": 2,
    "taskId": 1,
    "userId": 1,
    "score": 40,
    "text": "挺方便的！",
    "createdAt": "2019-04-18T11:36:28+08:00",
    "updatedAt": "2019-04-23T15:41:29+08:00",
    "user": users[1],
  },
  {
    "id": 3,
    "taskId": 1,
    "userId": 1,
    "score": 30,
    "text": "还可以~",
    "createdAt": "2019-04-18T11:36:28+08:00",
    "updatedAt": "2019-04-23T15:41:29+08:00",
    "user": users[1],
  },
  {
    "id": 4,
    "taskId": 2,
    "userId": 1,
    "score": 20,
    "text": "试了几次才成功:)",
    "createdAt": "2019-04-18T11:36:28+08:00",
    "updatedAt": "2019-04-23T15:41:29+08:00",
    "user": users[1],
  },
  {
    "id": 5,
    "taskId": 2,
    "userId": 1,
    "score": 10,
    "text": "开通失败:)",
    "createdAt": "2019-04-18T11:36:28+08:00",
    "updatedAt": "2019-04-23T15:41:29+08:00",
    "user": users[1],
  },
]

class MockResponse {
  constructor({ status = 200, statusText = 'OK', code = 0, message = '',
    data = {} }) {
    this.status = status
    this.statusText = statusText
    this.ok = status === 200

    this.code = code
    this.message = message
    this.data = data
  }

  json() {
    return {
      code: this.code,
      message: this.message,
      data: this.data,
    }
  }
}

const mockApis = {
  '/api/account/info': (url, options) => new Promise(
    (resolve, reject) => {
      setTimeout(() => {
        let user
        const id = typeof window !== 'undefined' && window.sessionStorage.getItem('currentUserId')
        if (id) {
          user = users[parseInt(id)]
        } else {
          user = { id: 0 }
        }

        resolve(new MockResponse({
          code: 0,
          message: '',
          data: {
            user,
          },
        }))
      }, Math.random() * 1000)
    }),
  '/api/account/register': (url, options) => new Promise(
    (resolve, reject) => {
      setTimeout(() => {
        resolve(new MockResponse({
          code: 0,
          message: '',
          data: {
            user: users[1],
          },
        }))
      }, Math.random() * 1000)
    }),
  '/api/account/login': (url, options) => new Promise(
    (resolve, reject) => {
      setTimeout(() => {
        const id = 1
        typeof window !== 'undefined' && window.sessionStorage.setItem('currentUserId', id)

        resolve(new MockResponse({
          code: 0,
          message: '',
          data: {
            user: users[id],
          },
        }))
      }, Math.random() * 1000)
    }),
  '/api/account/logout': (url, options) => new Promise(
    (resolve, reject) => {
      setTimeout(() => {
        typeof window !== 'undefined' && window.sessionStorage.removeItem('currentUserId')

        resolve(new MockResponse({
          code: 0,
          message: '',
          data: {},
        }))
      }, Math.random() * 1000)
    }),
  '/api/account/edit': (url, options) => new Promise(
    (resolve, reject) => {
      setTimeout(() => {
        const body = JSON.parse(options.body)
        Object.assign(users[1], body)

        resolve(new MockResponse({
          code: 0,
          message: '',
          data: {
            user: users[1],
          },
        }))
      }, Math.random() * 1000)
    }),
  '/api/task/publish': (url, options) => new Promise(
    (resolve, reject) => {
      setTimeout(() => {
        resolve(new MockResponse({
          code: 0,
          message: '',
          data: {
            task: tasks[1],
          },
        }))
      }, Math.random() * 1000)
    }),
  '/api/task/edit': (url, options) => new Promise(
    (resolve, reject) => {
      setTimeout(() => {
        const { id, ...fields } = JSON.parse(options.body)
        Object.assign(tasks[id], fields)

        resolve(new MockResponse({
          code: 0,
          message: '',
          data: {
            task: tasks[id],
          },
        }))
      }, Math.random() * 1000)
    }),
  '/api/task/info': (url, options) => new Promise(
    (resolve, reject) => {
      setTimeout(() => {
        const u = urlPackage.parse(url, true)
        const id = parseInt(u.query.id)

        if (tasks[id] === undefined) {
          resolve(new MockResponse({
            status: 404,
            statusText: 'Not Found',
          }))
        } else {
          resolve(new MockResponse({
            code: 0,
            message: '',
            data: {
              task: tasks[id],
            },
          }))
        }
      }, Math.random() * 1000)
    }),
  '/api/task/pay': (url, options) => new Promise(
    (resolve, reject) => {
      setTimeout(() => {
        const body = JSON.parse(options.body)
        Object.assign(tasks[body.id], { status: 'paied' })

        resolve(new MockResponse({
          code: 0,
          message: '',
          data: {
            task: tasks[body.id],
          },
        }))
      }, Math.random() * 1000)
    }),
  '/api/task/hot': (url, options) => new Promise(
    (resolve, reject) => {
      setTimeout(() => {
        const u = urlPackage.parse(url, true)
        const limit = parseInt(u.query.limit)

        const keys = Object.keys(tasks)
        resolve(new MockResponse({
          code: 0,
          message: '',
          data: {
            tasks: Array.from({ length: limit }, (x, i) =>
              tasks[keys[Math.floor(Math.random() * keys.length)]]),
            total: 100,
          },
        }))
      }, Math.random() * 1000)
    }),
  '/api/task/published': (url, options) => new Promise(
    (resolve, reject) => {
      setTimeout(() => {
        const u = urlPackage.parse(url, true)
        const limit = parseInt(u.query.limit)

        const keys = Object.keys(tasks)
        resolve(new MockResponse({
          code: 0,
          message: '',
          data: {
            tasks: Array.from({ length: limit }, (x, i) =>
              tasks[keys[Math.floor(Math.random() * keys.length)]]),
            total: 100,
          },
        }))
      }, Math.random() * 1000)
    }),
  '/api/task/comment': (url, options) => new Promise(
    (resolve, reject) => {
      setTimeout(() => {
        const { taskId, ...fields } = JSON.parse(options.body)
        const task = tasks[taskId]
        task.status = 'commented'

        const lastComment = comments[comments.length - 1]
        const comment = Object.assign(
          { ...lastComment },
          { id: lastComment.id + 1, taskId },
          fields
        )
        comments.push(comment)

        resolve(new MockResponse({
          code: 0,
          message: '',
          data: {
            comment,
          },
        }))
      }, Math.random() * 1000)
    }),
  '/api/task/comments/of/tasks': (url, options) => new Promise(
    (resolve, reject) => {
      setTimeout(() => {
        const u = urlPackage.parse(url, true)
        const taskId = parseInt(u.query.taskId)

        const taskComments = comments.filter(v => v.taskId === taskId)
        resolve(new MockResponse({
          code: 0,
          message: '',
          data: {
            comments: taskComments,
            total: 100,
          },
        }))
      }, Math.random() * 1000)
    }),
  '/api/task/comments/of/published/tasks': (url, options) => new Promise(
    (resolve, reject) => {
      setTimeout(() => {
        const u = urlPackage.parse(url, true)
        const userId = parseInt(u.query.userId)

        const taskComments = comments.filter(v => v.userId === userId)
        resolve(new MockResponse({
          code: 0,
          message: '',
          data: {
            comments: taskComments,
            total: taskComments.length,
          },
        }))
      }, Math.random() * 1000)
    }),
  '/api/user/info': (url, options) => new Promise(
    (resolve, reject) => {
      setTimeout(() => {
        const u = urlPackage.parse(url, true)
        const id = parseInt(u.query.id)

        if (users[id] === undefined) {
          resolve(new MockResponse({
            status: 404,
            statusText: 'Not Found',
          }))
        } else {
          resolve(new MockResponse({
            code: 0,
            message: '',
            data: {
              user: users[id],
            },
          }))
        }
      }, Math.random() * 1000)
    }),
}

export default mockApis
