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
}

export default mockApis
