import KoaRouter from 'koa-router'

import oauthRouter from './authorization.js'
import userRouter from './user.js'
import goodRouter from './good.js'
import orderRouter from './order.js'
import cartRouter from './cart.js'
import shippingRouter from './shipping.js'
import paymentRouter from './payment.js'
import imageRouter from './image.js'

const router = new KoaRouter({ prefix: '/api' })

// Routes for authorization.
router.use(oauthRouter.routes()).use(oauthRouter.allowedMethods())

// Routes for users' data.
router.use(userRouter.routes()).use(userRouter.allowedMethods())

// Routes for goods' data.
router.use(goodRouter.routes()).use(goodRouter.allowedMethods())

// Routes for orders' data.
router.use(orderRouter.routes()).use(orderRouter.allowedMethods())

// Routes for carts' data.
router.use(cartRouter.routes()).use(cartRouter.allowedMethods())

// Routes for shippings' data.
router.use(shippingRouter.routes()).use(shippingRouter.allowedMethods())

// Routes for payments' data.
router.use(paymentRouter.routes()).use(paymentRouter.allowedMethods())

// Routes for uploading image.
router.use(imageRouter.routes()).use(imageRouter.allowedMethods())

export default router
