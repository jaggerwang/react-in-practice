import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { Button, Result } from 'antd'

import { needLogin } from '../lib'
import JWPLoading from './loading'
import { JWPLayoutDefault } from '../components'

class JWPError extends React.Component {
  componentDidMount() {
    const { status } = this.props

    if (status === 401) {
      needLogin()
    }
  }

  render() {
    const { status, title } = this.props

    if (status === 401) {
      return (
        <JWPLoading notice="正在跳转登录页" />
      )
    }

    return (
      <div>
        <Head>
          <title key="title">错误页 - {process.env.title}</title>
        </Head>

        <JWPLayoutDefault>
          <Result
            status={`${status}`}
            title={title || `${status}`}
            extra={[
              <Button
                key="back"
                type="primary"
                onClick={() => {
                  if (Router.query.from) {
                    Router.push(Router.query.from)
                  } else {
                    Router.back()
                  }
                }}
              >
                返回前页
              </Button>,
              <Button key="index" onClick={() => Router.push('/')}>
                返回首页
              </Button>
            ]}
          />
        </JWPLayoutDefault>
      </div>
    )
  }
}

export default JWPError
