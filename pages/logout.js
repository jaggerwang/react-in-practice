import React from 'react'
import { connect } from 'react-redux'

import { logoutAction } from '../actions'
import { JWPLoading } from '../components'

class LogoutPage extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props

    dispatch(logoutAction())
      .then(resp => window.location.href = '/')
  }

  render() {
    return (
      <JWPLoading />
    )
  }
}

export default connect()(LogoutPage)
