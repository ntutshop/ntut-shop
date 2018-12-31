import KoaRouter from 'koa-router'
import controller from '../controllers/user.js'
import authController from '../controllers/authorization.js'

let router = new KoaRouter({ prefix: '/user' })

// Check user's login.
router.get('/state/login', authController.verifyJWTToken, controller.checkLogin)

// Check user's register.
router.get('/state/register', authController.verifyJWTToken, authController.verifyUserState, controller.checkLogin)

// Get user's information
router.get('/information', controller.getUserInformation)

// Add JWT token and user state verifications as authorization filter.
router.use(authController.verifyJWTToken, authController.verifyUserState)

// Modify user's profile.
router.put('/information', controller.modifyUserProfile)

// Get user's orders
router.get('/orders', controller.getOrdersInformation)

export default router
