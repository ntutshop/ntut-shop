import KoaRouter from 'koa-router'

import oauthRouter from './authorization.js'
import userRouter from './user.js'

const router = new KoaRouter({ prefix: '/api' })

// Routes for authorization.
router.use(oauthRouter.routes()).use(oauthRouter.allowedMethods())

// Routes for users' data.
router.use(userRouter.routes()).use(userRouter.allowedMethods())

export default router
