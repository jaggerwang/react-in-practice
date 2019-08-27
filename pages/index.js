import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { Card, List } from 'antd'

import { JWPApiService } from '../lib'
import { getHotTasksAction } from '../actions'
import { JWPLayoutDefault, TaskCard } from '../components'

const pageSize = 8

class IndexPage extends React.Component {
  static async getInitialProps({ req, query, store }) {
    let jwpApiService
    if (req) {
      jwpApiService = new JWPApiService({ headers: { cookie: req.headers.cookie } })
    }
    const resp = await store.dispatch(getHotTasksAction({
      jwpApiService, limit: pageSize
    }))
    const { tasks, total } = resp.data

    return { tasks, total }
  }

  onPageChange = (page, pageSize) => {
    Router.push({
      pathname: Router.pathname,
      query: Object.assign({ ...Router.query }, {
        offset: (page - 1) * pageSize,
      }),
    })
  }

  render() {
    const { query, tasks, total } = this.props

    return (
      <div>
        <Head>
          <title key="title">{process.env.title} - {process.env.slogan}</title>
        </Head>

        <JWPLayoutDefault {...this.props}>
          <div style={{ padding: 24 }}>
            <Card bordered={false} title="热门任务">
              <List
                grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4 }}
                dataSource={tasks}
                renderItem={task =>
                  <List.Item>
                    <TaskCard task={task} />
                  </List.Item>
                }
                size="large"
                pagination={{
                  current: Math.floor((parseInt(query.offset) || 0) / pageSize) + 1,
                  pageSize,
                  total,
                  showTotal: total => `共 ${total} 个`,
                  onChange: this.onPageChange,
                }}
              />
            </Card>
          </div>
        </JWPLayoutDefault>
      </div>
    )
  }
}

export default IndexPage
