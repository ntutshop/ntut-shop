import Order from '../models/Order.js'

/**
 * Publish a new order with basic information.
 * @param {IRouterContext} ctx Koa router's context.
 * @async
 */
async function postNewOrder(ctx) {
  let result = await Order.publishNewOrder(ctx.state.memberId, ctx.request.body)
  if (result.success) {
    ctx.status = 201
    ctx.body = { orderId: result.newOrder.id }
  } else {
    ctx.status = 400
    ctx.body = {
      type: 'body',
      error: result.error
    }
  }
}

export default {
  postNewOrder
}