import React from 'react'
import Router from 'next/router'
import { Button, Typography, Row, Col } from 'antd'

import { loginUrl } from '../lib/util'
import JWPLoading from './loading'

class JWPError extends React.Component {
  componentDidMount() {
    let { type } = this.props

    if (type === 401) {
      Router.replace(loginUrl())
    }
  }

  render() {
    let { type, desc } = this.props

    if (type === 401) {
      return (
        <JWPLoading notice="正在跳转登录页" />
      )
    }

    if (![403, 404, 500].includes(type)) {
      type = 500
    }
    return (
      <div>
        <Row type="flex" justify="center" align="middle" style={{ height: '100vh' }}>
          <Col span={12} className="left">
            <img
              src={`/static/img/${type}.svg`}
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            />
          </Col>
          <Col span={12} className="right">
            <div className="right-content">
              <Typography.Title level={1} style={{ marginBottom: 24, fontSize: 72 }}>
                {type}
              </Typography.Title>

              <Typography.Paragraph type="secondary" style={{ fontSize: 20 }}>
                {desc}
              </Typography.Paragraph>

              <div>
                <Button type="primary" onClick={() => Router.back()}>返回前页</Button>
                <Button onClick={() => Router.replace('/')} style={{ marginLeft: 12 }}>返回首页</Button>
              </div>
            </div>
          </Col>
        </Row>

        <style jsx>{`
          div :global(.left) {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          div :global(.right) {
            display: flex;
            align-items: center;
          }

          .right-content {
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
        `}</style>
      </div>
    )
  }
}

export default JWPError
