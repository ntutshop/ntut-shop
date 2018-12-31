import KoaRouter from 'koa-router'
import controller from '../controllers/image.js'
import authController from '../controllers/authorization.js'

let router = new KoaRouter({ prefix: '/image' })

// Add JWT token and user state verifications as authorization filter.
router.use(authController.verifyJWTToken, authController.verifyUserState)

// Upload image.
router.post('/', controller.uploadImage)

export default router
