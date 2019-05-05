import React from 'react'
import Head from 'next/head'

import { JWPError } from '../components'

class JWPErrorPage extends React.Component {
  static getInitialProps({ res, err }) {
    let type = res ? res.statusCode : (err ? err.statusCode : 500)
    let desc = '出错了，请稍后再试'

    if (res && res.actionError) {
      type = res.actionError.type
      desc = res.actionError.desc
    }

    return { type, desc }
  }

  render() {
    const { type, desc } = this.props

    return (
      <div>
        <Head>
          <title key="title">{type} - 及未支付</title>
        </Head>

        <JWPError type={type} desc={desc} />
      </div>
    )
  }
}

export default JWPErrorPage
