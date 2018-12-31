import KoaRouter from 'koa-router'

import oauthRouter from './authorization.js'
import userRouter from './user.js'
import imageRouter from './image.js'

const router = new KoaRouter({ prefix: '/api' })

// Routes for authorization.
router.use(oauthRouter.routes()).use(oauthRouter.allowedMethods())

// Routes for users' data.
router.use(userRouter.routes()).use(userRouter.allowedMethods())

// Routes for uploading image.
router.use(imageRouter.routes()).use(imageRouter.allowedMethods())

export default router
