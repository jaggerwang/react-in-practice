import React from 'react'

import { JWPError } from '../components'

class JWPErrorPage extends React.Component {
  static getInitialProps({ res, err }) {
    let status = res ? res.statusCode || 500 : (err ? err.statusCode || 500 : 500)
    let title = res ? res.statusMessage : (err ? `${err}` : '')

    if (res && res.actionError) {
      status = res.actionError.status
      title = res.actionError.title
    }

    return { status, title }
  }

  render() {
    const { status, title } = this.props

    return (
      <JWPError status={status} title={title} />
    )
  }
}

export default JWPErrorPage
