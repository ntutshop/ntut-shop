import KoaRouter from 'koa-router'
import controller from '../controllers/payment.js'

const router = new KoaRouter({ prefix: '/payments' })

router.get('/:id', controller.getPaymentById)

export default router