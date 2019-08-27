const withLess = require('@zeit/next-less')

const isProd = process.env.NODE_ENV === 'production'
const domain = process.env.JWP_DOMAIN || (isProd ? 'jwpay.app' : 'localhost:3000')

module.exports = withLess({
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  env: {
    name: 'jwpay',
    version: '1.0.0',
    title: '及未支付',
    slogan: '以任务的形式来完成支付',
    contactEmail: 'contact@mg.jwpay.app',

    theme: {
      primaryColor: '#d4380d',
      linkColor: '#610b00',
    },
  },
  publicRuntimeConfig: {
    domain,
    baseUrl: process.env.JWP_BASE_URL || (isProd ? `https://${domain}` : `http://${domain}`),
    logApiRequest: process.env.JWP_LOG_API_REQUEST !== undefined ? (process.env.JWP_LOG_API_REQUEST === 'true') : !isProd,
    logReduxAction: process.env.JWP_LOG_REDUX_ACTION !== undefined ? (process.env.JWP_LOG_REDUX_ACTION === 'true') : !isProd,
    mockJwpayApi: process.env.JWP_MOCK_JWPAY_API !== undefined ? (process.env.JWP_MOCK_JWPAY_API === 'true') : !isProd,
  },
  serverRuntimeConfig: {
  },
})
