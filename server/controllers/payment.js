import Shipping from '../models/Payment.js'

/**
 * Get a payment by paymentId.
 * @param {IRouterContext} ctx Koa router's context.
 * @async
 */
async function getPaymentById(ctx) {
  let paymentId = ctx.params.id
  let result = await Shipping.getPaymentById(paymentId)
  if (!result) {
    ctx.status = 404
    return
  }

  ctx.body = result
}

export default {
  getPaymentById
}