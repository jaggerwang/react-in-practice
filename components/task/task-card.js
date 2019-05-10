import React from 'react'
import Link from 'next/link'
import { connect } from 'react-redux'
import { Card, Tooltip, Avatar, Typography } from 'antd'
import moment from 'moment'

class TaskCard extends React.Component {
  render() {
    const { task } = this.props

    return (
      <div>
        <Card
          title={
            <Link
              href={{ pathname: '/task/detail', query: { id: task.id } }}
              as={`/tasks/${task.id}`}
            >
              <a>{task.title}</a>
            </Link>
          }
          size="small"
        >
          <div className={`body ${task.coverFileId !== 0 ? 'bg' : ''}`}>
            {task.coverFileId !== 0 ?
              <Typography.Paragraph
                ellipsis={{ rows: 1 }}
                className="desc-light"
              >
                {task.desc}
              </Typography.Paragraph> :
              <Typography.Paragraph
                ellipsis={{ rows: 7 }}
                style={{ marginBottom: 0 }}
              >
                {task.desc}
              </Typography.Paragraph>}
          </div>

          <div className="footer">
            <Tooltip title="发布者">
              <span>
                <Link
                  href={{ pathname: '/user/detail', query: { id: task.user.id } }}
                >
                  <a>
                    <Avatar icon="user" src={task.user.avatarFile.thumbUrls.small} size="small" />
                    <span className="align-middle" style={{ marginLeft: 4 }}>{task.user.username}</span>
                  </a>
                </Link>
              </span>
            </Tooltip>

            <Tooltip title="发布时间">
              <span>{moment(task.createdAt).format('YYYY-MM-DD')}</span>
            </Tooltip>
          </div>
        </Card>

        <style jsx>{`
          .body {
            height: 147px;
            word-break: break-all;
          }

          .body.bg {
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            background-image: url("${task.coverFileId !== 0 ? task.coverFile.thumbUrls.middle : ''}");
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
          }

          div :global(.desc-light) {
            margin-bottom: 0px;
            padding: 8px;
            background-color: rgba(0, 0, 0, 0.2);
            color: rgba(255, 255, 255, .85);
          }
              
          .footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 12px;
          }
        `}</style>
      </div>
    )
  }
}

export default connect()(TaskCard)
