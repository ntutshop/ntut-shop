import KoaRouter from 'koa-router'
import controller from '../controllers/shipping.js'

const router = new KoaRouter({ prefix: '/shippings' })

router.get('/:id', controller.getShippingById)

export default router