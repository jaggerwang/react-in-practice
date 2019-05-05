const { parse } = require('url')
const express = require('express')
const next = require('next')

const devProxy = {
  '/api': {
    target: 'http://localhost:4000',
    pathRewrite: { '^/api': '/' },
    changeOrigin: true,
  },
}

const port = 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    server = express()

    if (dev && devProxy) {
      const proxyMiddleware = require('http-proxy-middleware')
      Object.keys(devProxy).forEach(function (context) {
        server.use(proxyMiddleware(context, devProxy[context]))
      })
    }

    server.all('*', (req, res) => {
      const parsedUrl = parse(req.url, true)

      handle(req, res, parsedUrl)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
  .catch(err => {
    console.log('An error occurred, unable to start the server')
    console.log(err)
  })
