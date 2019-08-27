import React from 'react'
import { connect } from 'react-redux'
import { Modal, Button, Tabs, Icon } from 'antd'

import { handleActionError, payTaskAction } from '../../actions'

class PayTask extends React.Component {
  state = {
    isVisible: false,
    isSubmitting: false,
    payPlatform: 'alipay',
  }

  show = () => {
    this.setState({ isVisible: true })
  }

  hide = () => {
    this.setState({ isVisible: false })
  }

  onOk = () => {
    const { dispatch, task, onSucceed } = this.props
    const { payPlatform } = this.state

    this.setState({ isSubmitting: true })
    dispatch(payTaskAction({
      id: task.id,
      payPlatform,
      payAmount: task.payAmount,
    }))
      .then(resp => {
        const { task } = resp.data
        this.setState({ isSubmitting: false })
        this.hide()
        onSucceed && onSucceed(task)
      })
      .catch(error => {
        this.setState({ isSubmitting: false })
        handleActionError(error)
      })
  }

  render() {
    const { isVisible, isSubmitting, payPlatform } = this.state

    return (
      <Modal
        visible={isVisible}
        title="任务付费"
        onCancel={this.hide}
        footer={
          <div>
            <Button onClick={this.hide}>取消</Button>
            <Button
              type="primary"
              loading={isSubmitting}
              onClick={this.onOk}
              style={{ marginLeft: 8 }}
            >
              确认
            </Button>
          </div>
        }
      >
        <div>
          <Tabs
            activeKey={payPlatform}
            animated={false}
            onChange={payPlatform => this.setState({ payPlatform })}
          >
            <Tabs.TabPane key="alipay" tab="支付宝" forceRender className="alipay">
              <Icon type="alipay" />
            </Tabs.TabPane>

            <Tabs.TabPane key="wechat" tab="微信" forceRender className="wechat">
              <Icon type="wechat" />
            </Tabs.TabPane>
          </Tabs>

          <style jsx>{`
            :global(.alipay), :global(.wechat) {
              display: flex;
              justify-content: space-around;
              padding: 24px;
              font-size: 5rem;
            }

            :global(.alipay) {
              color: #00aaee;
            }

            :global(.wechat) {
              color: #20d329;
            }
          `}</style>
        </div>
      </Modal>
    )
  }
}

export default connect(
  null, null, null, { forwardRef: true }
)(PayTask)
