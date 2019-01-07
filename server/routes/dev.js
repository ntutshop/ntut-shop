import KoaRouter from 'koa-router'
import controller from '../controllers/dev.js'
import { SERVER_CONFIG } from '../config/config.js'

const router = new KoaRouter({ prefix: '/dev' })

if (SERVER_CONFIG.MODE !== 'production') {
  router.get('/login', controller.fakeFacebookLogin)
}

export default router
