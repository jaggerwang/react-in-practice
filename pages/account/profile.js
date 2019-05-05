import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { connect } from 'react-redux'
import {
  Card, Row, Col, Icon, Button, Input, Divider, PageHeader, Avatar
} from 'antd'

import { editAccountAction, getAccountInfoAction } from '../../actions'
import { JWPLayoutSimple, UploadFile } from '../../components'

class _ProfileItem extends React.Component {
  state = {
    mode: 'read',
    value: '',
    isSubmitting: false,
  }

  componentDidMount() {
    const { user, name } = this.props
    this.setState({ value: user[name] })
  }

  toggleEdit = () => {
    const { mode } = this.state

    this.setState({
      mode: mode === 'read' ? 'edit' : 'read',
    })
  }

  submit = () => {
    const { dispatch, name } = this.props
    const { value } = this.state

    this.setState({ isSubmitting: true })
    dispatch(editAccountAction({
      [name]: value,
    }))
      .then(resp => {
        this.setState({ isSubmitting: false })
        this.toggleEdit()
        dispatch(getAccountInfoAction())
      })
  }

  render() {
    const { user, name, validator } = this.props
    const { mode, value, isSubmitting } = this.state

    let input
    if (name === 'intro') {
      input = (
        <Input.TextArea
          value={value}
          disabled={isSubmitting}
          rows={3}
          onChange={e => this.setState({ value: e.target.value })}
          onPressEnter={this.submit}
        />
      )
    } else if (name === 'password') {
      input = (
        <Input.Password
          value={value}
          visibilityToggle
          disabled={isSubmitting}
          onChange={e => this.setState({ value: e.target.value })}
          onPressEnter={this.submit}
        />
      )
    } else {
      input = (
        <Input
          value={value}
          allowClear
          disabled={isSubmitting}
          onChange={e => this.setState({ value: e.target.value })}
          onPressEnter={this.submit}
        />
      )
    }

    return (
      <div className="root">
        {mode === 'edit' ?
          <div className="edit">
            {input}

            <div className="submit" style={{ marginTop: 12 }}>
              <Button
                type="primary"
                loading={isSubmitting}
                disabled={!value ||
                  (validator !== undefined && !validator(value)) ||
                  isSubmitting}
                onClick={this.submit}
              >
                提交
              </Button>
              <Button onClick={this.toggleEdit}>取消</Button>
            </div>
          </div> :
          <div className="read">
            <span>{name === 'password' ? '******' : (user[name] || '暂无')}</span>
            <Icon
              type="edit"
              onClick={this.toggleEdit}
              style={{ marginLeft: 8 }}
            />
          </div>
        }

        <style jsx>{`
          .root {
            color: rgba(0, 0, 0, .45);
          }

          .edit {
            max-width: 300px;
          }

          .submit {
            display: flex;
          }

          div :global(.ant-btn) + :global(.ant-btn) {
            margin-left: 12px;
          }
        `}</style>
      </div>
    )
  }
}

const ProfileItem = connect(({ account }) => {
  const { user } = account
  return {
    user,
  }
})(_ProfileItem)

class ProfilePage extends React.Component {
  static async getInitialProps({ store, req, res, pathname, query }) {
    return { pathname, query }
  }

  onAvatarChange = (file) => {
    const { dispatch } = this.props

    dispatch(editAccountAction({ avatarFileId: file.id }))
      .then(resp => {
        dispatch(getAccountInfoAction())
      })
  }

  onCoverChange = (file) => {
    const { dispatch } = this.props

    dispatch(editAccountAction({ coverFileId: file.id }))
      .then(resp => {
        dispatch(getAccountInfoAction())
      })
  }

  render() {
    const { pathname, user } = this.props

    const labelLayout = {
      xs: 24,
      sm: 6,
    }
    const valueLayout = {
      xs: 24,
      sm: 18,
    }

    return (
      <div>
        <Head>
          <title key="title">个人资料 - 及未支付</title>
        </Head>

        <JWPLayoutSimple {...{ pathname }}>
          <PageHeader title="个人资料" onBack={() => Router.back()} />

          <div style={{ padding: 24 }}>
            <Card bordered={false}>
              <div className={`root ${user.coverFileId !== 0 ? 'bg' : ''}`}>
                <Avatar
                  icon="user"
                  src={user.avatarFile.thumbUrls.small}
                  size={100}
                />

                <div style={{ marginTop: 12 }}>
                  <UploadFile
                    text="设置头像"
                    accept="image/*"
                    sizeLimit={4 * 1024 * 1024}
                    bucket="jwpay"
                    path="/user"
                    onChange={this.onAvatarChange}
                  />
                </div>

                <div className="upload-cover">
                  <UploadFile
                    text="设置背景"
                    accept="image/*"
                    sizeLimit={4 * 1024 * 1024}
                    bucket="jwpay"
                    path="/user"
                    onChange={this.onCoverChange}
                  />
                </div>

                <style jsx>{`
                  .root {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    position: relative;
                    height: 320px;
                    margin-bottom: 24px;
                    background-color: #fff2e8;
                  }

                  .bg {
                    background-image: url("${user.coverFileId !== 0 ? user.coverFile.thumbUrls.large : ''}");
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: cover;
                  }

                  .upload-cover {
                    position: absolute;
                    top: 12px;
                    right: 12px;
                  }
                `}</style>
              </div>

              <Row>
                <Col {...labelLayout}>
                  <label className="label">用户名</label>
                </Col>
                <Col {...valueLayout}>
                  <ProfileItem
                    name="username"
                    validator={value => value.length >= 2 && value.length <= 20}
                  />
                </Col>
              </Row>
              <Divider />
              <Row>
                <Col {...labelLayout}>
                  <label className="label">密码</label>
                </Col>
                <Col {...valueLayout}>
                  <ProfileItem
                    name="password"
                    validator={value => value.length >= 6 && value.length <= 20}
                  />
                </Col>
              </Row>
              <Divider />
              <Row>
                <Col {...labelLayout}>
                  <label className="label">自我介绍</label>
                </Col>
                <Col {...valueLayout}>
                  <ProfileItem
                    name="intro"
                    validator={value => value.length >= 5 && value.length <= 100}
                  />
                </Col>
              </Row>
            </Card>
          </div>
        </JWPLayoutSimple>
      </div>
    )
  }
}

export default connect(({ account }) => {
  const { user } = account
  return { user }
})(ProfilePage)
