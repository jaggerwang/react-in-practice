import React from 'react'
import { Comment, Avatar, Icon } from 'antd'
import moment from 'moment'

function TaskCommentItem({ comment }) {
  return (
    <Comment
      avatar={<Avatar icon="user" src={comment.user.avatarFile.thumbUrls.small} />}
      author={
        <span>
          <span>{comment.user.username}</span>
          <span style={{ marginLeft: 8 }}>
            {(comment.score / 10).toFixed(1)}
            <Icon type="star" theme="filled" style={{ marginLeft: 4, color: '#fadb14' }} />
          </span>
        </span>
      }
      content={comment.text}
      datetime={moment(comment.at).fromNow()}
    />
  )
}

export default TaskCommentItem
