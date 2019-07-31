import React from 'react'
import App from 'next/app'
import getConfig from 'next/config'
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import moment from 'moment'
import 'moment/locale/zh-cn'

import { pageview } from '../lib'
import { makeStore } from '../store'

import '../assets/main.less'

moment.locale('zh-cn')

const { publicRuntimeConfig } = getConfig()

if (publicRuntimeConfig.enableGoogleAnalytics === 'true') {
  Router.events.on('routeChangeComplete', url => pageview(url))
}

class JWPApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const { store } = ctx

    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}

    return { store, pageProps }
  }

  render() {
    const { store, Component, pageProps } = this.props

    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    )
  }
}

export default withRedux(makeStore)(JWPApp)
