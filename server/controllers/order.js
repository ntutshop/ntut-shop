import Good from '../models/Good.js'
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
      quantity: data.quantity,
      shipping: data.shipping_id,
      payment: data.payment_id,
      total: data.total
    },
    state: data.state,
    transactionTime: data.transaction_time
  }
}

async function patchOrderState(ctx) {
  let orderId = ctx.params.id
  let state = ctx.request.body.state

  let result = await Order.getOrderInformationById(orderId)
  if (!result) {
    ctx.status = 404
    return
  }

  const sellerId = (await Good.getGoodInformationById(result.good_id)).member_id
  const buyerId = result.member_id

  switch (result.state) {
    case 0:
      if (ctx.state.memberId == sellerId) {
        if (state == 1 || state == 3) {
          await Order.changeOrderState(orderId, state)
        }
        else {
          ctx.status = 403
          return
        }
      }
      else if (ctx.state.memberId == buyerId) {
        if (state == 4) {
          await Order.changeOrderState(orderId, state)
        }
        else {
          ctx.status = 403
          return
        }
      }
      else {
        ctx.status = 403
        return
      }
      break

    case 1:
      if (ctx.state.memberId == sellerId) {
        if (state == 5) {
          await Order.changeOrderState(orderId, state)
        }
        else {
          ctx.status = 403
          return
        }
      }
      else if (ctx.state.memberId == buyerId) {
        if (state == 2 || state == 4) {
          await Order.changeOrderState(orderId, state)
        }
        else {
          ctx.status = 403
          return
        }
      }
      else {
        ctx.status = 403
        return
      }
      break

    default:
      ctx.status = 403
      return
  }

  result = await Order.getOrderInformationById(orderId)
  let data = result.toJSON()
  ctx.body = {
    id: data.id,
    buyerId: data.member_id,
    good: {
      id: data.good_id,
      quantity: data.quantity,
      shipping: data.shipping_id,
      payment: data.payment_id,
      total: data.total
    },
    state: data.state,
    transactionTime: data.transaction_time
  }
}

export default {
  postNewOrder,
  getOrderById,
  patchOrderState
}