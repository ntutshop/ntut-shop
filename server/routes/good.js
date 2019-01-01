import KoaRouter from 'koa-router'
import authController from '../controllers/authorization.js'
import controller from '../controllers/good.js'

const router = new KoaRouter({ prefix: '/goods' })

router.get('/', controller.getGoods)

router.get('/:id', controller.getGoodById)

router.get('/:id/images', controller.getAllImagesUrlByGoodId)

router.get('/:id/shippings', controller.getAllShippingsByGoodId)

router.get('/:id/payments', controller.getAllPaymentsByGoodId)

router.get('/:id/tags', controller.getAllTagsByGoodId)

// Add JWT token and user state verifications as authorization filter.
router.use(authController.verifyJWTToken, authController.verifyUserState)

// A route for users to publish their new goods.
router.post('/', controller.postNewGood)

export default router