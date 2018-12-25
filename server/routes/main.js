import KoaRouter from 'koa-router'

import devRouter from './dev.js'
import oauthRouter from './authorization.js'

const router = new KoaRouter({ prefix: '/api' })

// If SERVER_CONFIG.MODE !== 'development', all the routes under dev-router will be applied.
router.use(devRouter.routes()).use(devRouter.allowedMethods())

// Routes for authorization.
router.use(oauthRouter.routes()).use(oauthRouter.allowedMethods())

export default router
