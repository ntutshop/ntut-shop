import KoaRouter from 'koa-router'
import controller from '../controllers/user.js'
import authController from '../controllers/authorization.js'

let router = new KoaRouter({ prefix: '/user' })

// Get user's state.
router.get('/state', controller.getUserState)

// Get user's information
router.get('/information', controller.getUserInformation)

// Add JWT token and user state verifications as authorization filter.
router.use(authController.verifyJWTToken, authController.verifyUserState)

// Modify user's profile.
router.put('/information', controller.modifyUserProfile)

export default router
