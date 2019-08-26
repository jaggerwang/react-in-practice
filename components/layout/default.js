import React from 'react'
import { Layout } from 'antd'

import JWPFooter from './footer'
import JWPHeader from './header'

export default function JWPLayoutDefault({ children }) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <JWPHeader />

      <Layout.Content>
        {children}
      </Layout.Content>

      <JWPFooter />
    </Layout>
  )
}
