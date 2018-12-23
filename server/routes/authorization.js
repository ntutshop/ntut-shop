import KoaRouter from 'koa-router'
import controller from '../controllers/authorization.js'

let router = new KoaRouter()

// A callback from Facebook.
router.get('/oauth/facebook/callback', controller.OAuthCallback)

// Logout route.
router.get('/logout', controller.Logout)

export default router
