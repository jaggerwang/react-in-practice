import React from 'react'
import App from 'next/app'
import getConfig from 'next/config'
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'

import { makeStore } from '../store'
import { pageview, JWPApiResponse } from '../lib'
import ErrorPage from './error'

import '../assets/main.less'

moment.locale('zh-cn')

const { publicRuntimeConfig } = getConfig()

if (publicRuntimeConfig.enableGoogleAnalytics === 'true') {
  Router.events.on('routeChangeComplete', url => pageview(url))
}

class JWPApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const { req, res, pathname, query, store } = ctx

    let pageError, pageProps
    try {
      pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    } catch (error) {
      if (error instanceof JWPApiResponse) {
        pageError = { status: error.status, title: error.message }
      } else {
        throw error
      }
    }

    return { pathname, query, store, pageError, pageProps }
  }

  componentDidMount() {
    const { pageError } = this.props
    if (pageError) {
      return
    }
  }

  render() {
    const { Component, pathname, query, store, pageError, pageProps } = this.props

    return (
      <ConfigProvider locale={zhCN}>
        <Provider store={store}>
          {pageError ?
            <ErrorPage {...{ pathname, query, store }} {...pageError} /> :
            <Component {...{ pathname, query, store }} {...pageProps} />
          }
        </Provider>
      </ConfigProvider>
    )
  }
}

export default withRedux(makeStore)(JWPApp)
