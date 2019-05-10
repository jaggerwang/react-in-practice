import React from 'react'
import Router from 'next/router'
import {
  Form, Input, InputNumber, DatePicker, Button, Divider, Modal, Tooltip
} from 'antd'
import moment from 'moment'

import {
  handleActionError, resetFormAction, publishTaskAction, editTaskAction
} from '../../actions'
import { showMessage } from '../../lib/feedback'
import UploadFile from '../storage/upload-file'

export class TaskForm extends React.Component {
  state = {
    isSubmitting: false,
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { dispatch, formName, form, task } = this.props

    form.validateFields((err, values) => {
      if (err) {
        return
      }

      let { title, desc, coverFile, payAmount, validRange, text, link,
        credentials } = values

      coverFile = coverFile || { id: 0 }
      const coverFileId = coverFile.id

      payAmount *= 100

      const [startAt, stopAt] = validRange

      if (task) {
        this.setState({ isSubmitting: true })
        dispatch(editTaskAction({
          id: task.id, title, desc, coverFileId, payAmount, startAt, stopAt,
          text, link, credentials
        }))
          .then(resp => {
            this.setState({ isSubmitting: false })
            showMessage('保存成功', { type: 'success' })
          })
          .catch(error => {
            this.setState({ isSubmitting: false })
            handleActionError({ error })
          })
      } else {
        this.setState({ isSubmitting: true })
        dispatch(publishTaskAction({
          title, desc, coverFileId, payAmount, startAt, stopAt, text, link,
          credentials
        }))
          .then(resp => {
            this.setState({ isSubmitting: false })
            dispatch(resetFormAction({ name: formName }))
            showMessage('发布成功', { type: 'success' })

            const { task } = resp.data
            Router.replace({ pathname: '/task/edit', query: { id: task.id } })
          })
          .catch(error => {
            this.setState({ isSubmitting: false })
            handleActionError({ error })
          })
      }
    })
  }

  render() {
    const { dispatch, formName, form, task, fields } = this.props
    const { isSubmitting } = this.state

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    }

    const fieldsError = form.getFieldsError()
    const isSubmitDisabled = Object.keys(fieldsError).some(field => fieldsError[field])

    const coverFile = ((fields['coverFile'] && fields['coverFile'].value) ?
      fields['coverFile'].value :
      { id: 0 })

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item {...formItemLayout} label="标题" hasFeedback>
            {form.getFieldDecorator('title', {
              rules: [
                { required: true, message: '请输入标题' },
                { min: 5, max: 100, message: '标题长度须为 5~100' },
              ],
            })(
              <Input />
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} label="描述" hasFeedback>
            {form.getFieldDecorator('desc', {
              rules: [
                { required: true, message: '请输入描述' },
                { min: 5, max: 1000, message: '描述长度须为 5~1000' },
              ],
            })(
              <Input.TextArea rows={5} />
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} label="封面">
            {coverFile.id !== 0 ?
              <div className="root">
                <img
                  src={coverFile.thumbUrls.middle}
                  style={{ maxHeight: 270 }}
                />

                <div className="top-right-op">
                  <Tooltip title="删除封面">
                    <Button
                      icon="delete"
                      onClick={() => form.setFieldsValue({
                        coverFile: { id: 0 },
                      })}
                    />
                  </Tooltip>
                </div>

                <style jsx>{`
                .root {
                  position: relative;
                  display: inline-block;
                  margin-bottom: 8px;
                }

                .top-right-op {
                  display: none;
                  position: absolute;
                  top: 8px;
                  right: 8px;
                }

                .root:hover .top-right-op {
                  display: block;
                }
              `}</style>
              </div> :
              null}

            <div>
              {form.getFieldDecorator('coverFile', {
                rules: [],
              })(
                <UploadFile
                  text="选取封面"
                  accept="image/*"
                  sizeLimit={4 * 1024 * 1024}
                  bucket="jwpay"
                  path="/task"
                />
              )}
            </div>
          </Form.Item>

          <Form.Item {...formItemLayout} label="费用">
            {form.getFieldDecorator('payAmount', {
              rules: [
                { required: true, message: '请输入完成任务需要的费用' },
              ],
            })(
              <InputNumber precision={0} min={1} max={10000} />
            )}
            <span className="ant-form-text">元</span>
          </Form.Item>

          <Form.Item {...formItemLayout} label="开始~结束时间">
            {form.getFieldDecorator('validRange', {
              initialValue: [
                moment().startOf('day'),
                moment().startOf('day').add(12, 'months').subtract(1, 'seconds'),
              ],
              rules: [
                { required: true, message: '请输入任务开始和结束时间' },
              ],
            })(
              <DatePicker.RangePicker
                disabledDate={(current) => (current && (
                  current < moment().startOf('day')
                  || current >= moment().startOf('day').add(1, 'years')
                ))}
                ranges={{
                  '今日': [
                    moment().startOf('day'),
                    moment().endOf('day'),
                  ],
                  '一个月': [
                    moment().startOf('day'),
                    moment().startOf('day').add(1, 'months').subtract(1, 'seconds'),
                  ],
                  '一年': [
                    moment().startOf('day'),
                    moment().startOf('day').add(12, 'months').subtract(1, 'seconds'),
                  ],
                }}
              />
            )}
          </Form.Item>

          <Divider dashed>
            <span className="text-notice">以下内容完成任务后可见</span>
          </Divider>

          <Form.Item {...formItemLayout} label="文本" hasFeedback>
            {form.getFieldDecorator('text', {
              rules: [
                { required: true, message: '请输入文本任务内容' },
                { min: 5, max: 10000, message: '文本任务内容长度须为 5~10000' },
              ],
            })(
              <Input.TextArea rows={5} placeholder="文本任务内容" />
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} label="链接" hasFeedback>
            {form.getFieldDecorator('link', {
              rules: [
                { type: 'url', message: '链接格式错误' },
                { max: 200, message: '链接长度不能超过 200' },
              ],
            })(
              <Input placeholder="更多任务内容下载地址，比如第三方网盘资料地址" />
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} label="凭证" hasFeedback>
            {form.getFieldDecorator('credentials', {
              rules: [
                { max: 200, message: '凭证长度不能超过 200' },
              ],
            })(
              <Input placeholder="获取更多任务内容时需要提供的密码、令牌或密钥等" />
            )}
          </Form.Item>

          <Form.Item>
            <div className="root">
              <Button
                type="primary"
                htmlType="submit"
                disabled={isSubmitDisabled}
                loading={isSubmitting}
              >
                {task ? '保存' : '发布'}
              </Button>
              <Button
                onClick={() => {
                  Modal.confirm({
                    title: '确认重置',
                    content: '重置后表单数据将全部清空，确认执行？',
                    onOk: () => {
                      dispatch(resetFormAction({ name: formName }))
                    },
                  })
                }}
                style={{ marginLeft: 16 }}
              >
                重置
              </Button>

              <style jsx>{`
                .root {
                  display: flex;
                  justify-content: center;
                }
              `}</style>
            </div>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default TaskForm
