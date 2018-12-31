import Koa from 'koa'
import consola from 'consola'

import setup from './setup.js'
import { SERVER_CONFIG as SV_CONFIG } from './config/config.js'

const app = new Koa()
const host = process.env.HOST || SV_CONFIG.HOST
const port = process.env.PORT || SV_CONFIG.PORT

async function start () {
  // Setup APIs
  await setup(app)

  if (!host || host === '*') {
    app.listen(port)
  } else {
    app.listen(port, host)
  }

  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
