import React from 'react'
import { Layout, Spin, Typography } from 'antd'

function JWPLoading(props) {
  const { notice } = props

  return (
    <Layout>
      <div className="root" style={{ width: '100vw', height: '100vh' }}>
        <Spin size="large" />
        {notice ?
          <Typography.Text style={{ marginTop: 24 }}>
            {notice}
          </Typography.Text> :
          null}

        <style jsx>{`
          .root {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
        `}</style>
      </div>
    </Layout>
  )
}

export default JWPLoading
