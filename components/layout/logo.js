import React from 'react'
import Link from 'next/link'

export default function JWPLogo() {
  return (
    <Link href="/">
      <a>
        <img src="/static/img/jwpay-100.png" />
        <h1>及未支付</h1>

        <style jsx>{`
          img {
            display: inline-block;
            vertical-align: middle;
            width: 32px;
            height: 32px;
          }

          h1 {
            display: inline-block;
            vertical-align: middle;
            line-height: 64px;
            margin: 0;
            color: #d4380d;
            font-size: 1.5rem;
            font-weight: 600;
          }
        `}</style>
      </a>
    </Link>
  )
}
