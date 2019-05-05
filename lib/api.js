import querystring from 'querystring'
import urlPackage from 'url'

import mockApis from './mock-apis'

export class JWPApiResponse {
  constructor({ status = 200, code = 0, message = '', data = {} }) {
    this.status = status
    this.code = code
    this.message = message
    this.data = data
  }
}

export class JWPApi {
  timeout = 0
  headers = {}

  constructor({ timeout = 10000, headers = {} } = {}) {
    this.timeout = timeout
    this.headers = headers
  }

  request(path, options) {
    const url = `http://localhost:3000/api${path}`

    options = Object.assign({
      credentials: 'include',
      timeout: this.timeout,
    }, options)
    options.headers = Object.assign({ ...this.headers }, options.headers || {})

    console.log({ url, options })

    return Promise.race([
      mockApis[urlPackage.parse(url).pathname](url, options),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('fetch timeout')), options.timeout)
      )
    ]).then(resp => {
      if (!resp.ok) {
        return Promise.reject(new JWPApiResponse({
          status: resp.status,
          message: resp.statusText,
        }))
      }

      return resp.json()
    })
      .then(({ code, message, data }) => {
        console.log({ code, message, data })

        if (code === 0) {
          return new JWPApiResponse({ code, message, data })
        } else {
          return Promise.reject(new JWPApiResponse({ code, message, data }))
        }
      })
      .catch(e => {
        if (e instanceof JWPApiResponse) {
          return Promise.reject(e)
        } else {
          return Promise.reject(new JWPApiResponse({
            status: 400,
            message: e.message || String(e),
          }))
        }
      })
  }

  get(path, params, options = {}) {
    if (typeof params === 'object') {
      params = querystring.stringify(params)
    }
    if (params) {
      path = `${path}?${params}`
    }
    return this.request(path, Object.assign(options, {
      method: 'GET',
    }))
  }

  post(path, body, options = {}) {
    if (typeof body === 'object') {
      options.headers = options.headers || {}
      options.headers['Content-Type'] = 'application/json'
      body = JSON.stringify(body)
    }
    return this.request(path, Object.assign(options, {
      method: 'POST',
      body,
    }))
  }
}
