import KoaRouter from 'koa-router'
import authController from '../controllers/authorization.js'
import controller from '../controllers/good.js'

const router = new KoaRouter({ prefix: '/goods' })

// Add JWT token and user state verifications as authorization filter.
router.use(authController.verifyJWTToken, authController.verifyUserState)

// A route for users to publish their new goods.
router.post('/', controller.postNewGood)

export default router