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

/**
 * Get a order by ORDER id.
 * @param {IRouterContext} ctx Koa router's context.
 * @async
 */
async function getOrderById(ctx) {
  let orderId = ctx.params.id

  let result = await Order.getOrderInformationById(orderId)
  if (!result) {
    ctx.status = 404
    return
  }

  let data = result.toJSON()

  ctx.body = {
    id: data.id,
    buyerId: data.member_id,
    good: {
      id: data.good_id,
      quantity: data.quantity
    },
    state: data.state,
    transactionTime: data.transaction_time
  }
}

export default {
  postNewOrder,
  getOrderById
}