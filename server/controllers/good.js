import Good from '../models/Good.js'
import Shipping from '../models/Shipping.js'
import Payment from '../models/Payment.js'
import Image from '../models/Image.js'
import Tag from '../models/Tag.js'

/**
 * Publish a new good with basic information.
 * @param {IRouterContext} ctx Koa router's context.
 * @async
 */
async function postNewGood(ctx) {
  let body = ctx.request.body
  let goodBody = {
    "name": body.name,
    "description": body.description,
    "price": body.price,
    "stock": body.stock,
    "durability": body.durability
  }
  let result = await Good.publishNewGood(ctx.state.memberId, goodBody)

  // When it isn't successful to insert a new good into Good.
  if (!result.success) {
    ctx.status = 400
    ctx.body = {
      type: 'body',
      error: result.error
    }
    return
  }

  let goodId = result.newGood.id
  result = await Shipping.createManyShippings(goodId, body.shippings)
  if (!result.success) {
    ctx.status = 400
    ctx.body = {
      type: 'body',
      error: result.error
    }
    return
  }

  result = await Payment.createManyPayment(goodId, body.payments)
  if (!result.success) {
    ctx.status = 400
    ctx.body = {
      type: 'body',
      error: result.error
    }
    return
  }

  result = await Image.createManyImages(goodId, body.images)
  if (!result.success) {
    ctx.status = 400
    ctx.body = {
      type: 'body',
      error: result.error
    }
    return
  }

  result = await Tag.createManyTags(goodId, body.tags)
  if (!result.success) {
    ctx.status = 400
    ctx.body = {
      type: 'body',
      error: result.error
    }
    return
  }

  ctx.status = 201
  ctx.body = { goodId }
}

export default {
  postNewGood
}