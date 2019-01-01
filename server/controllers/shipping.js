import Shipping from '../models/Shipping.js'

/**
 * Get a shipping by shippingId.
 * @param {IRouterContext} ctx Koa router's context.
 * @async
 */
async function getShippingById(ctx) {
  let shippingId = ctx.params.id
  let result = await Shipping.getShippingById(shippingId)
  if (!result) {
    ctx.status = 404
    return
  }

  ctx.body = result
}

export default {
  getShippingById
}