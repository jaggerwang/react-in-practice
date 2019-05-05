import React from 'react'
import { Upload, Button } from 'antd'

class UploadFile extends React.Component {
  state = {
    loading: false,
  }

  beforeUpload = (file) => {
    const { sizeLimit } = this.props

    if (file.size > sizeLimit) {
      return false
    }

    return false
  }

  getData = (file) => {
    const { bucket, path } = this.props

    return {
      bucket,
      path,
      meta: JSON.stringify({
        name: file.name,
        size: file.size,
        type: file.type,
      }),
    }
  }

  handleChange = ({ file, fileList, event }) => {
    const { onChange } = this.props

    if (file.status === 'uploading') {
      this.setState({ loading: true })
    } else if (file.status === 'error') {
      this.setState({ loading: false })
    } else if (file.status === 'done') {
      this.setState({ loading: false })
      const { code, data } = file.response
      if (code === 0) {
        onChange && onChange(data.file)
      }
    }
  }

  render() {
    const { text = '选取文件', accept } = this.props
    const { loading } = this.state

    return (
      <Upload
        action="/api/storage/upload"
        showUploadList={false}
        data={this.getData}
        accept={accept}
        beforeUpload={this.beforeUpload}
        supportServerRender
        withCredentials
        onChange={this.handleChange}
      >
        <Button icon="upload" loading={loading}>{text}</Button>
      </Upload>
    )
  }
}

export default UploadFile
