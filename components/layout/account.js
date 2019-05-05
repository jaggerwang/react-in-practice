import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { connect } from 'react-redux'
import { Dropdown, Menu, Icon, Avatar } from 'antd'

class JWPHeaderAccount extends React.Component {
  render() {
    const { user } = this.props;

    return (
      user.id === 0 ?
        <Link href="/login">
          <a className="header-button">登录</a>
        </Link> :
        <Dropdown
          overlay={() =>
            <Menu>
              <Menu.Item>
                <Link href="/account/profile">
                  <a>
                    <Icon type="profile" />
                    <span style={{ paddingLeft: 8 }}>个人资料</span>
                  </a>
                </Link>
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item>
                <a onClick={() => Router.push('/logout')}>
                  <Icon type="logout" />
                  <span style={{ paddingLeft: 8 }}>退出登录</span>
                </a>
              </Menu.Item>
            </Menu>}
        >
          <a className="header-button ant-dropdown-link">
            <Avatar icon="user" src={user.avatarFile.thumbUrls.small} />
            <span className="align-middle" style={{ paddingLeft: 8 }}>{user.username}</span>
          </a>
        </Dropdown>
    )
  }
}

export default connect(({ account }) => {
  const { user } = account
  return { user }
})(JWPHeaderAccount)
