import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { connect } from 'react-redux'
import { Card, PageHeader, Form } from 'antd'
import moment from 'moment'

import { loginUrl } from '../../lib'
import { saveFormAction } from '../../actions'
import { JWPError, JWPLayoutSimple, TaskForm } from '../../components'

const PublishTaskForm = connect(({ form }) => {
  return {
    fields: form['publishTask'] || {},
    formName: 'publishTask',
  }
})(Form.create({
  name: 'publishTask',
  onFieldsChange(props, changedFields) {
    const { dispatch, formName } = props

    dispatch(saveFormAction({
      name: formName,
      changedFields
    }))
  },
  mapPropsToFields(props) {
    const { fields } = props

    const formFields = {}
    Object.entries(fields).forEach(([k, v]) => {
      if (k === 'validRange') {
        v = Object.assign(
          {}, v, { value: v['value'].map((v) => moment(v)) }
        )
      }
      formFields[k] = Form.createFormField(v)
    })
    return formFields
  },
})(TaskForm))

class PublishTaskPage extends React.Component {
  static async getInitialProps({ pathname, query }) {
    return { pathname, query }
  }

  componentDidMount() {
    const { user } = this.props
    if (user.id === 0) {
      Router.replace(loginUrl())
    }
  }

  render() {
    const { actionError, pathname } = this.props

    if (actionError) {
      return <JWPError {...actionError} />
    }

    return (
      <div>
        <Head>
          <title key="title">发布任务 - 及未支付</title>
        </Head>

        <JWPLayoutSimple {...{ pathname }}>
          <PageHeader title="发布任务" onBack={() => Router.back()} />

          <div style={{ padding: 24 }}>
            <Card bordered={false}>
              <PublishTaskForm />
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
})(PublishTaskPage)
