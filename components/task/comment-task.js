import React from 'react'
import { connect } from 'react-redux'
import { Modal, Form, Rate, Input } from 'antd'

import { showMessage } from '../../lib'
import { handleActionError, commentTaskAction } from '../../actions'

class _CommentForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()

    const { dispatch, updateState, form, task, onSucceed } = this.props

    form.validateFields((err, values) => {
      if (err) {
        return
      }

      const { score, text } = values

      updateState({ isSubmitting: true })
      dispatch(commentTaskAction({
        taskId: task.id,
        score: Math.round(score * 10),
        text,
      }))
        .then(resp => {
          const { comment } = resp.data
          updateState({ isVisible: false, isSubmitting: false })
          showMessage('评价成功', { type: 'success' })
          onSucceed && onSucceed(comment)
        })
        .catch(error => {
          updateState({ isSubmitting: false })
          handleActionError(error)
        })
    })
  }

  render() {
    const { form } = this.props

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    }

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item {...formItemLayout} label="评分">
          {form.getFieldDecorator('score', {
            rules: [
              { required: true, message: '请选择评分' },
            ],
          })(
            <Rate allowHalf style={{ color: '#fadb14' }} />
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="评论" hasFeedback>
          {form.getFieldDecorator('text', {
            rules: [
              { max: 100, message: '评论长度不能超过 100' },
            ],
          })(
            <Input.TextArea rows={3} placeholder="对本次任务有什么想说的" />
          )}
        </Form.Item>
      </Form>
    )
  }
}

const CommentForm = connect()(Form.create({
  name: 'commentForm',
})(_CommentForm))

class CommentTask extends React.Component {
  state = {
    isVisible: false,
    isSubmitting: false,
  }

  show() {
    this.setState({ isVisible: true })
  }

  render() {
    const { task, onSucceed } = this.props
    const { isVisible, isSubmitting } = this.state

    return (
      <Modal
        visible={isVisible}
        title="评价任务"
        onOk={(e) => this.commentForm.handleSubmit(e)}
        onCancel={() => this.setState({ isVisible: false })}
        confirmLoading={isSubmitting}
      >
        <CommentForm
          wrappedComponentRef={(form) => this.commentForm = form}
          task={task}
          onSucceed={onSucceed}
          updateState={(state) => this.setState(state)}
        />
      </Modal>
    )
  }
}

export default CommentTask
