import React from 'react'
import { Upload, Button } from 'antd'

import { showMessage, JWPApiCode } from '../../lib'

class UploadFile extends React.Component {
  state = {
    loading: false,
    fileList: [],
  }

  reset() {
    this.setState({ fileList: [] })
  }

  beforeUpload = (file) => {
    const { sizeLimit } = this.props

    if (file.size > sizeLimit) {
      showMessage('文件大小超过限制')
      return false
    }

    return true
  }

  getData = (file) => {
    const { region = '', bucket = '', path = '' } = this.props

    return { region, bucket, path }
  }

  onChange = ({ file, fileList, event }) => {
    const { onChange, multiple } = this.props

    if (file.status === 'uploading') {
      this.setState({ loading: true })
    } else if (file.status === 'error') {
      this.setState({ loading: false })
      showMessage(file.error.message)
    } else if (file.status === 'done') {
      this.setState({ loading: false })
      const { code, message, data } = file.response
      if (code !== JWPApiCode.OK) {
        showMessage(message)
        return
      }

      onChange && onChange(multiple ? data.files : data.files[0])
    }

    this.setState({ fileList })
  }

  render() {
    const { text = '选取文件', ...props } = this.props
    const { loading, fileList } = this.state

    return (
      <Upload
        {...props}
        action="/api/storage/upload"
        beforeUpload={this.beforeUpload}
        data={this.getData}
        fileList={fileList}
        name="files"
        supportServerRender
        withCredentials
        onChange={this.onChange}
      >
        <Button icon="upload" loading={loading}>{text}</Button>
      </Upload>
    )
  }
}

export default UploadFile
