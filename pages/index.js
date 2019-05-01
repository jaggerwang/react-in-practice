import React from 'react'
import { Button } from 'antd'

import { JWPLayoutSimple } from '../components'

class IndexPage extends React.Component {
  render() {
    return (
      <JWPLayoutSimple>
        <Button>Hello</Button>
      </JWPLayoutSimple>
    )
  }
}

export default IndexPage
