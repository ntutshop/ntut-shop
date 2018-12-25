import KoaRouter from 'koa-router'
import controller from '../controllers/dev.js'

const router = new KoaRouter({ prefix: '/dev' })

router.get('/facebook_login', controller.FakeFacebookLogin)

export default router
