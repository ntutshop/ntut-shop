import Cart from '../models/Cart.js'

/**
 * Publish a new order with basic information.
 * @param {IRouterContext} ctx Koa router's context.
 * @async
 */
async function patchCart(ctx) {
  let result = await Cart.patchCartGoods(ctx.state.memberId, ctx.request.body)
  if (result.success) {
    ctx.status = 201
    ctx.body = { goods: result.goods }
  } else {
    ctx.status = 400
    ctx.body = {
      type: 'body',
      error: result.error
    }
  }
}

/**
 * Get a cart by user's token.
 * @param {IRouterContext} ctx Koa router's context.
 * @async
 */
async function getCartByToken(ctx) {
  let result = await Cart.getCartGoodsByMemberId(ctx.state.memberId)
  if (!result) {
    ctx.status = 404
    return
  }

  ctx.body = { goods: result }
}

export default {
  patchCart,
  getCartByToken
}