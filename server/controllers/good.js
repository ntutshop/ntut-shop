import Good from '../models/Good.js'

/**
 * Publish a new good with basic information.
 * @param {IRouterContext} ctx Koa router's context.
 * @async
 */
async function postNewGood(ctx) {
  let result = await Good.publishNewGood(ctx.state.memberId, ctx.request.body)
  if (result.success) {
    ctx.status = 201
    ctx.body = { goodId: result.newGood.id }
  } else {
    ctx.status = 400
    ctx.body = {
      type: 'body',
      error: result.error
    }
  }
}

export default {
  postNewGood
}