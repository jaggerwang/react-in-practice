import React from 'react'
import Link from 'next/link'
import { Layout, Tooltip, Icon, Dropdown, Menu } from 'antd'

import JWPLogo from './logo'
import JWPHeaderAccount from './account'

class JWPHeader extends React.Component {
  render() {
    const { pathname } = this.props

    return (
      <Layout.Header className="header">
        <div className="left unfold" >
          <JWPLogo />

          <Link href="https://jwpay.app">
            <a className="header-button" target="_blank">完整应用</a>
          </Link>
        </div>

        <div className="left fold" >
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item>
                  <Link href="/">
                    <a>首页</a>
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link href="https://jwpay.app">
                    <a target="_blank">完整应用</a>
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link href="/task/publish" passHref>
                    <a>发布任务</a>
                  </Link>
                </Menu.Item>
              </Menu>
            }
          >
            <img src={`/static/img/jwpay-100.png`} className="logo" />
          </Dropdown>
        </div>

        <div className="right" >
          <div className="unfold">
            <Link href="/task/publish" passHref>
              <Tooltip title="发布任务">
                <a className={'header-button' + (pathname === '/task/publish' ? ' selected' : '')}>
                  <Icon type="plus" />
                </a>
              </Tooltip>
            </Link>
          </div>

          <JWPHeaderAccount />
        </div>

        <style jsx>{`
          :global(.header) {
            display: flex;
            padding: 0 24px;
            background-color: #fff;
            box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
            z-index: 1;
          }

          .logo {
            display: inline-block;
            vertical-align: middle;
            width: 32px;
            height: 32px;
          }

          .right {
            margin-left: auto;
          }

          .selected {
            color: #d4380d;
          }

          @media screen and (max-width: 480px) {
            .unfold {
              display: none;
            }
            .fold {
              display: inline-block;
            }
          }

          @media screen and (min-width: 480px) {
            .unfold {
              display: inline-block;
            }
            .fold {
              display: none;
            }
          }
        `}</style>
      </Layout.Header>
    )
  }
}

export default JWPHeader
