import url from 'url'
import Router from 'next/router'

export function loginUrl({ pathname, query } = {}) {
  return url.format({
    pathname: '/login',
    query: {
      from: url.format({
        pathname: pathname || Router.pathname,
        query: query || Router.query
      })
    }
  })
}

export function compareVersion(v1, v2, len = 3) {
  v1 = (v1 + '.0.0').split('.').map(v => parseInt(v))
  v2 = (v2 + '.0.0').split('.').map(v => parseInt(v))
  for (let i = 0; i < Math.min(len, 3); i++) {
    if (v1[i] > v2[i]) {
      return 1
    } else if (v1[i] < v2[i]) {
      return -1
    }
  }
  return 0
}
