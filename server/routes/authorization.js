import KoaRouter from 'koa-router'
import controller from '../controllers/authorization.js'

let router = new KoaRouter()

// A callback
router.get('/oauth/facebook/callback', controller.handleOAuthCallback)

// Sign-up a new member.
router.post('/signup', controller.verifyJWTToken, controller.fillShellCustomerMember)

// Logout route.
router.get('/logout', controller.logout)

router.post('/login', controller.handleOAuthCallback)

export default router
