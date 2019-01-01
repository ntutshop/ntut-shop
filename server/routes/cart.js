import KoaRouter from 'koa-router'
import authController from '../controllers/authorization.js'
import controller from '../controllers/cart.js'

const router = new KoaRouter({ prefix: '/cart' })

// Add JWT token and user state verifications as authorization filter.
router.use(authController.verifyJWTToken, authController.verifyUserState)

router.patch('/', controller.patchCart)

router.get('/', controller.getCartByToken)

export default router