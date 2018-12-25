import KoaRouter from 'koa-router'
import oauthRouter from './authorization.js'

const router = new KoaRouter()

// Use '/api' as routers' prefix.
router.prefix('/api')

// Routes for authorization.
router.use(oauthRouter.routes()).use(oauthRouter.allowedMethods())

export default router
