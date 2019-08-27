import React from 'react'
import Head from 'next/head'
import { Layout } from 'antd'

import JWPFooter from './footer'
import JWPHeader from './header'

export default function JWPLayoutDefault({ children }) {
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Layout style={{ minHeight: '100vh' }}>
        <JWPHeader />

        <Layout.Content>
          {children}
        </Layout.Content>

        <JWPFooter />
      </Layout>
    </div>
  )
}
