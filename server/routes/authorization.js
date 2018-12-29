import KoaRouter from 'koa-router'
import controller from '../controllers/authorization.js'

let router = new KoaRouter()

// Sign-up a new member.
router.post('/signup', controller.verifyJWTToken, controller.handleSignup)

// Logout route.
router.get('/logout', controller.handleLogout)

// Login route.
router.post('/login', controller.handleLogin)

export default router
