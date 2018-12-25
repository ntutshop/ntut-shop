import KoaRouter from 'koa-router'
import { SERVER_CONFIG } from '../config/config.js'

import devRouter from './dev.js'
import oauthRouter from './authorization.js'

const router = new KoaRouter({ prefix: '/api' })

if (SERVER_CONFIG.MODE !== 'production') {
  // When the MODE is 'development', attach the 'dev' router on the main router.
  router.use(devRouter.routes()).use(devRouter.allowedMethods())
} else {
  // Routes for authorization.
  router.use(oauthRouter.routes()).use(oauthRouter.allowedMethods())
}

export default router
