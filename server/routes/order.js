import KoaRouter from 'koa-router'
import authController from '../controllers/authorization.js'
import controller from '../controllers/order.js'

const router = new KoaRouter({ prefix: '/orders' })

// Add JWT token and user state verifications as authorization filter.
router.use(authController.verifyJWTToken, authController.verifyUserState)

// A route for users to publish their new orders.
router.post('/', controller.postNewOrder)

export default router