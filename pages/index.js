import React from 'react'
import { Button } from 'antd'

import { handleActionError, getAccountInfoAction } from '../actions'
import { JWPError, JWPLayoutSimple } from '../components'

class IndexPage extends React.Component {
  static async getInitialProps({ store, req, res, pathname, query }) {
    try {
      const resp = await store.dispatch(getAccountInfoAction())
      const { user } = resp.data

      return { pathname, query, user }
    } catch (error) {
      return handleActionError({ isInitial: true, error, res })
    }
  }

  render() {
    const { actionError, pathname } = this.props

    if (actionError) {
      return <JWPError {...actionError} />
    }

    return (
      <JWPLayoutSimple {...{ pathname }}>
        <Button>Hello</Button>
      </JWPLayoutSimple>
    )
  }
}

export default IndexPage
