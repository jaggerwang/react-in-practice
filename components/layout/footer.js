import React from 'react'

export default function JWPFooter() {
  return (
    <div className="root">
      <a href="mailto:contact@mg.jwpay.app" target="_blank">联系我们</a>

      <span>Copyright © 2018-2019 及未支付</span>

      <style jsx>{`
        .root {
          display: flex;
          justify-content: space-between;
          padding: 24px;
        }
      `}</style>
    </div>
  )
}
