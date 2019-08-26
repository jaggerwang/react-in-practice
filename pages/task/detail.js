import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import { connect } from 'react-redux'
import { Card, Row, Col, Skeleton, Button, Tooltip, Typography, List } from 'antd'
import moment from 'moment'

import { JWPApi, loginUrl } from '../../lib'
import { handleActionError, getTaskInfoAction, getTaskCommentsAction } from '../../actions'
import { JWPError, JWPLayoutDefault, PayTask, CommentTask, TaskCommentItem } from '../../components'

const commentPageSize = 5


class TaskDetailPage extends React.Component {
  payTaskRef = React.createRef()
  commentTaskRef = React.createRef()

  state = {
    task: {},
    comments: [],
    commentTotal: 0,
  }

  static async getInitialProps({ store, req, res, pathname, query }) {
    try {
      let jwpApi
      if (req) {
        jwpApi = new JWPApi({ headers: { cookie: req.headers.cookie } })
      }

      let resp = await store.dispatch(getTaskInfoAction({
        jwpApi, id: query.id
      }))
      let { task } = resp.data

      resp = await store.dispatch(getTaskCommentsAction({
        jwpApi, taskId: query.id, limit: commentPageSize
      }))
      const { comments, total: commentTotal } = resp.data

      return { pathname, query, task, comments, commentTotal }
    } catch (error) {
      return handleActionError({ isInitial: true, error, res })
    }
  }

  constructor(props) {
    super(props)

    const { task, comments, commentTotal } = props
    Object.assign(this.state, { task, comments, commentTotal })
  }

  onCommentPageChange = (page, pageSize) => {
    const { dispatch, query } = this.props

    dispatch(getTaskCommentsAction({
      taskId: query.id, limit: commentPageSize, offset: (page - 1) * pageSize
    }))
      .then(resp => {
        const { comments: comments, total: commentTotal } = resp.data
        this.setState({ comments, commentTotal })
      })
      .catch(error => handleActionError({ error }))
  }

  render() {
    let { actionError, pathname, user } = this.props
    let { task, comments, commentTotal } = this.state

    if (actionError) {
      return <JWPError {...actionError} />
    }

    const ops = []
    if (task.status === 'pending') {
      ops.push(
        <Tooltip title="付费完成任务后可查看任务内容">
          <Button
            type="primary"
            size="large"
            disabled={moment(task.startAt).isAfter(moment()) ||
              moment(task.stopAt).isBefore(moment())}
            onClick={() => {
              if (user.id === 0) {
                Router.replace(loginUrl())
              } else {
                this.payTaskRef.current.show()
              }
            }}
          >
            付费
          </Button>
        </Tooltip>
      )
    } else if (task.status === 'paied') {
      ops.push(
        <Button
          size="large"
          onClick={() => this.commentTaskRef.current.show()}
        >
          评价
        </Button>
      )
    }
    if (task.userId === user.id) {
      ops.push(
        <Button
          size="large"
          onClick={() => Router.push(`/task/edit?id=${task.id}`)}
        >
          编辑
        </Button>
      )
    }

    const propLayout = { span: 12 }

    return (
      <div>
        <Head>
          <title key="title">{task.title} - 及未支付</title>
        </Head>

        <JWPLayoutDefault {...{ pathname }}>
          <div className={`root ${task.coverFileId !== 0 ? 'bg' : ''}`}>
            <Typography.Title
              level={2}
              className={`${task.coverFileId !== 0 ? 'title-light' : ''}`}
              style={{ marginBottom: 0, maxWidth: '70%' }}
            >
              {task.title}
            </Typography.Title>

            <Row gutter={36} type="flex" style={{ marginTop: 36 }}>
              {ops.map((v, i) => <Col key={i}>{v}</Col>)}
            </Row>

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
                background-image: url("${task.coverFileId !== 0 ? task.coverFile.thumbUrls.large : ''}");
                background-position: center;
                background-repeat: no-repeat;
                background-size: cover;
              }

              div :global(.title-light) {
                color: rgba(255, 255, 255, .85);
              }
            `}</style>
          </div>

          <div style={{ padding: 24 }}>
            <Row gutter={24}>
              <Col xs={24} md={16}>
                <Card bordered={false} title="任务信息">
                  <Row>
                    <Col {...propLayout}>
                      <p>
                        <span>发布者：</span>
                        <Link
                          href={`/user/detail?id=${task.userId}`}
                        >
                          <a>{task.user.username || '匿名'}</a>
                        </Link>
                      </p>
                    </Col>
                    <Col {...propLayout}>
                      <p>
                        <span>发布时间：</span>
                        <Typography.Text type="secondary">
                          {moment(task.createdAt).format('YYYY-MM-DD')}
                        </Typography.Text>
                      </p>
                    </Col>
                    <Col {...propLayout}>
                      <p>
                        <span>开始时间：</span>
                        <Typography.Text type="secondary">
                          {moment(task.startAt).format('YYYY-MM-DD')}
                        </Typography.Text>
                      </p>
                    </Col>
                    <Col {...propLayout}>
                      <p>
                        <span>结束时间：</span>
                        <Typography.Text type="secondary">
                          {moment(task.stopAt).format('YYYY-MM-DD')}
                        </Typography.Text>
                      </p>
                    </Col>
                    <Col {...propLayout}>
                      <p>
                        <span>费用：</span>
                        <Typography.Text type="secondary">
                          ￥{(task.payAmount / 100).toFixed(2)}
                        </Typography.Text>
                      </p>
                    </Col>
                  </Row>

                  <Typography.Paragraph type="secondary">
                    {task.desc}
                  </Typography.Paragraph>
                </Card>

                <Card bordered={false} title="任务内容" style={{ marginTop: 24, marginBottom: 24 }}>
                  {task.status === 'pending' || task.text ?
                    <Skeleton loading={task.status === 'pending'} title={false} >
                      <Row>
                        <Typography.Paragraph type="secondary">
                          {task.text}
                        </Typography.Paragraph>
                      </Row>
                    </Skeleton> :
                    null}

                  {task.status === 'pending' || task.link ?
                    <Row style={{ marginTop: 12 }}>
                      <Col span={3}>
                        <p>链接</p>
                      </Col>
                      <Col span={21}>
                        <Skeleton loading={task.status === 'pending'} title={false}>
                          <Typography.Paragraph copyable={{ text: task.link }} style={{ marginBottom: 0 }}>
                            <a href={task.link} target="_blank">{task.link}</a>
                          </Typography.Paragraph>
                        </Skeleton>
                      </Col>
                    </Row> :
                    null}

                  {task.status === 'pending' || task.credentials ?
                    <Row style={{ marginTop: 12 }}>
                      <Col span={3}>
                        <p>凭证</p>
                      </Col>
                      <Col span={21}>
                        <Skeleton loading={task.status === 'pending'} title={false}>
                          <Typography.Paragraph copyable style={{ marginBottom: 0 }}>
                            {task.credentials}
                          </Typography.Paragraph>
                        </Skeleton>
                      </Col>
                    </Row> :
                    null}
                </Card>
              </Col>
              <Col xs={24} md={8}>
                <Card bordered={false} title="评价">
                  <List
                    dataSource={comments}
                    renderItem={comment => (
                      <TaskCommentItem comment={comment} />
                    )}
                    pagination={{
                      pageSize: commentPageSize,
                      total: commentTotal,
                      showTotal: total => `共 ${total} 条`,
                      onChange: this.onCommentPageChange,
                      size: 'small',
                    }}
                  />
                </Card>
              </Col>
            </Row>
          </div>

          <PayTask
            ref={this.payTaskRef}
            task={task}
            onSucceed={task => this.setState({ task })}
          />

          <CommentTask
            ref={this.commentTaskRef}
            task={task}
            onSucceed={comment => this.setState({
              comments: [comment].concat(comments),
              commentTotal: commentTotal + 1,
            })}
          />
        </JWPLayoutDefault>
      </div >
    )
  }
}

export default connect(({ account }) => {
  const { user } = account
  return { user }
})(TaskDetailPage)
