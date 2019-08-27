import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { connect } from 'react-redux'
import { Form, Input, Button, Divider, Card } from 'antd'

import { registerAction } from '../actions'
import { JWPLayoutDefault } from '../components'

class _RegisterForm extends React.Component {
  state = {
    isSubmitting: false,
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { dispatch, form } = this.props

    form.validateFields((err, values) => {
      if (err) {
        return
      }

      const { username, password } = values

      this.setState({ isSubmitting: true })
      dispatch(registerAction({ username, password }))
        .then(resp => {
          this.setState({ isSubmitting: false })
          Router.push('/login')
        })
    })
  }

  render() {
    const { form } = this.props
    const { isSubmitting } = this.state

    const fieldsError = form.getFieldsError()
    const isSubmitDisabled = Object.keys(fieldsError).some(field => fieldsError[field])

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item>
          {form.getFieldDecorator('username', {
            rules: [
              { required: true, message: '请输入用户名' },
              { min: 2, max: 20, message: '用户名长度须为 2~20' },
            ],
          })(
            <Input placeholder="用户名" />
          )}
        </Form.Item>

        <Form.Item>
          {form.getFieldDecorator('password', {
            rules: [
              { required: true, message: '请输入密码' },
              { min: 6, max: 20, message: '密码长度须为 6~20' },
            ],
          })(
            <Input type="password" placeholder="密码" />
          )}
        </Form.Item>

        <Divider />

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={isSubmitDisabled}
            loading={isSubmitting}
            block
          >
            注册
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

const RegisterForm = connect()(Form.create({
  name: 'registerForm'
})(_RegisterForm))

class RegisterPage extends React.Component {
  render() {
    return (
      <div>
        <Head>
          <title key="title">注册 - 及未支付</title>
        </Head>

        <JWPLayoutDefault {...this.props}>
          <div className="root">
            <Card
              title="注册"
              bordered={false}
              style={{ marginTop: 64, minWidth: 360 }}
            >
              <RegisterForm />
            </Card>

            <style jsx>{`
              .root {
                display: flex;
                justify-content: center;
              }
            `}</style>
          </div>
        </JWPLayoutDefault>
      </div>
    )
  }
}

export default RegisterPage
