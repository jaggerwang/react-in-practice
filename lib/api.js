import getConfig from 'next/config'
import querystring from 'querystring'
import fetch from 'isomorphic-unfetch'
import urlPackage from 'url'

import mockApis from './mock-apis'

const { publicRuntimeConfig } = getConfig()

// API 响应错误码
export const JWPApiCode = {
  OK: 'ok',
  FAIL: 'fail',
  DUPLICATE: 'duplicate',
}

export class JWPApiResponse {
  constructor({ status = 200, code = JWPApiCode.OK, message = '', data = {} }) {
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
    const url = `${publicRuntimeConfig.baseUrl}/api${path}`

    options.headers = { ...this.headers, ...(options.headers || {}) }
    options = {
      credentials: 'include',
      timeout: this.timeout,
      ...options
    }

    if (publicRuntimeConfig.logApiRequest) {
      console.log({ url, options })
    }

    return Promise.race([
      publicRuntimeConfig.mockApi ?
        mockApis[urlPackage.parse(url).pathname](url, options) :
        fetch(url, options),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('fetch timeout')), options.timeout)
      )
    ]).then(resp => {
      if (!resp.ok) {
        return Promise.reject(new JWPApiResponse({
          status: resp.status,
          code: JWPApiCode.FAIL,
          message: resp.statusText,
        }))
      }

      return resp.json()
    })
      .then(({ code, message, data }) => {
        if (publicRuntimeConfig.logApiRequest) {
          console.log({ code, message, data })
        }

        if (code === JWPApiCode.OK) {
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
            status: 500,
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
