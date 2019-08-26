import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { Card, List } from 'antd'

import { JWPApi } from '../lib'
import { handleActionError, getHotTasksAction } from '../actions'
import { JWPError, JWPLayoutDefault, TaskCard } from '../components'

const pageSize = 8

class IndexPage extends React.Component {
  static async getInitialProps({ store, req, res, pathname, query }) {
    try {
      let jwpApi
      if (req) {
        jwpApi = new JWPApi({ headers: { cookie: req.headers.cookie } })
      }
      const resp = await store.dispatch(getHotTasksAction({
        jwpApi, limit: pageSize
      }))
      const { tasks, total } = resp.data

      return { pathname, query, tasks, total }
    } catch (error) {
      return handleActionError({ isInitial: true, error, res })
    }
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
    const { actionError, pathname, query, tasks, total } = this.props

    if (actionError) {
      return <JWPError {...actionError} />
    }

    return (
      <div>
        <Head>
          <title key="title">{process.env.title} - {process.env.slogan}</title>
        </Head>

        <JWPLayoutDefault {...{ pathname }}>
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
