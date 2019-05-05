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