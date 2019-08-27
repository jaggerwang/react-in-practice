import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { connect } from 'react-redux'
import { Card, List, Row, Col, Avatar, Typography } from 'antd'

import { JWPApiService } from '../../lib'
import {
  handleActionError, getUserInfo, getPublishedTasksAction,
  getTaskCommentsOfPublishedTasksAction
} from '../../actions'
import { JWPLayoutDefault, TaskCard, TaskCommentItem } from '../../components'

const pageSize = 6
const commentPageSize = 5

class UserDetailPage extends React.Component {
  state = {
    taskComments: [],
    taskCommentTotal: 0,
  }

  static async getInitialProps({ req, query, store }) {
    let jwpApiService
    if (req) {
      jwpApiService = new JWPApiService({ headers: { cookie: req.headers.cookie } })
    }
    let resp = await store.dispatch(getUserInfo({
      jwpApiService, id: query.id
    }))
    const { user } = resp.data

    resp = await store.dispatch(getPublishedTasksAction({
      jwpApiService, userId: query.id, limit: pageSize, ...query
    }))
    const { tasks, total } = resp.data

    resp = await store.dispatch(getTaskCommentsOfPublishedTasksAction({
      jwpApiService, userId: query.id, limit: commentPageSize
    }))
    const { comments: taskComments, total: taskCommentTotal } = resp.data

    return { user, tasks, total, taskComments, taskCommentTotal }
  }

  constructor(props) {
    super(props)

    const { taskComments, taskCommentTotal } = props
    Object.assign(this.state, { taskComments, taskCommentTotal })
  }

  onPageChange = (page, pageSize) => {
    Router.push({
      pathname: Router.pathname,
      query: Object.assign({ ...Router.query }, {
        offset: (page - 1) * pageSize,
      }),
    })
  }

  onCommentPageChange = (page, pageSize) => {
    const { dispatch, query } = this.props

    dispatch(getTaskCommentsOfPublishedTasksAction({
      userId: query.id, limit: commentPageSize, offset: (page - 1) * pageSize
    }))
      .then(resp => {
        const { completedTasks: taskComments, total: taskCommentTotal } = resp.data
        this.setState({ taskComments, taskCommentTotal })
      })
      .catch(handleActionError)
  }

  render() {
    const { query, user, tasks, total } = this.props
    let { taskComments, taskCommentTotal } = this.state

    tasks.forEach(v => v.user = user)

    return (
      <div>
        <Head>
          <title key="title">{`${user.username} ${user.intro}`} - 及未支付</title>
        </Head>

        <JWPLayoutDefault {...this.props}>
          <div className={`root ${user.coverFileId !== 0 ? 'bg' : ''}`}>
            <Avatar icon="user" src={user.avatarFile.thumbUrls.small} size={100} />

            <Typography.Title
              level={3}
              className={user.coverFileId !== 0 ? 'username-light' : ''}
              style={{ marginTop: 12, marginBottom: 12 }}
            >
              {user.username}
            </Typography.Title>

            <Typography.Text
              type="secondary"
              className={user.coverFileId !== 0 ? 'intro-light' : ''}
              style={{ maxWidth: '70%', fontSize: 16 }}
            >
              {user.intro || '暂无介绍'}
            </Typography.Text>

            <style jsx>{`
              .root {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 320px;
                background-color: #fff2e8;
              }

              .bg {
                background-image: url("${user.coverFileId !== 0 ? user.coverFile.thumbUrls.large : ''}");
                background-position: center;
                background-repeat: no-repeat;
                background-size: cover;
              }

              div :global(.username-light) {
                color: rgba(255, 255, 255, .85);
              }

              div :global(.intro-light) {
                color: rgba(255, 255, 255, .65);
              }
            `}</style>
          </div>

          <div style={{ padding: 24 }}>
            <Row gutter={24}>
              <Col sm={24} md={16}>
                <Card bordered={false} title="最新任务" style={{ marginBottom: 24 }}>
                  <List
                    grid={{ gutter: 16, sm: 1, md: 2, xl: 3 }}
                    dataSource={tasks}
                    size="large"
                    pagination={{
                      current: Math.floor((parseInt(query.offset) || 0) / pageSize) + 1,
                      pageSize,
                      total,
                      showTotal: total => `共 ${total} 个`,
                      onChange: this.onPageChange,
                    }}
                    renderItem={(task, index) =>
                      <List.Item>
                        <TaskCard task={task} />
                      </List.Item>
                    }
                  />
                </Card>
              </Col>
              <Col sm={24} md={8}>
                <Card bordered={false} title="评价">
                  <List
                    dataSource={taskComments}
                    renderItem={comment => (
                      <TaskCommentItem comment={comment} />
                    )}
                    pagination={{
                      pageSize: commentPageSize,
                      total: taskCommentTotal,
                      showTotal: total => `共 ${total} 条`,
                      onChange: this.onCommentPageChange,
                      size: 'small',
                    }}
                  />
                </Card>
              </Col>
            </Row>
          </div>
        </JWPLayoutDefault>
      </div>
    )
  }
}

export default connect(({ account }) => {
  return { account }
})(UserDetailPage)
