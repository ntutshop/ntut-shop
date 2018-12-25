import Koa from 'koa'
import consola from 'consola'
import { Nuxt, Builder } from 'nuxt'

import setup from './setup.js'
import { SERVER_CONFIG as SV_CONFIG } from './config/config.js'

// Import and Set Nuxt.js options
import config from '../nuxt.config.js'

const app = new Koa()
const host = process.env.HOST || SV_CONFIG.HOST
const port = process.env.PORT || SV_CONFIG.PORT
config.dev = !(SV_CONFIG.MODE === 'production')

async function start () {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Setup APIs
  await setup(app)

  app.use(ctx => {
    ctx.status = 200 // koa defaults to 404 when it sees that status is unset

    return new Promise((resolve, reject) => {
      ctx.res.on('close', resolve)
      ctx.res.on('finish', resolve)
      nuxt.render(ctx.req, ctx.res, promise => {
        // nuxt.render passes a rejected promise into callback on error.
        promise.then(resolve).catch(reject)
      })
    })
  })

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
