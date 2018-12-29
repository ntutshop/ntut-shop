import KoaRouter from 'koa-router'
import controller from '../controllers/authorization.js'
import { SERVER_CONFIG } from '../config/config.js'

let router = new KoaRouter()

if (SERVER_CONFIG.MODE === 'production') {
  // A callback from Facebook.
  router.get('/oauth/facebook/callback', controller.OAuthCallback)
}

// Sign-up a new member.
router.post('/signup', controller.VerifyJWTToken, controller.FillShellCustomerMember)

// Logout route.
router.get('/logout', controller.Logout)

router.post('/login', controller.OAuthCallback)

export default router
