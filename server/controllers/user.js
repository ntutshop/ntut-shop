import Member from '../models/Member.js'

/**
 * If query.username exists, this middleware will go find the user's information by it.
 * Otherwise, it will go to next middleware.
 * @param {IRouterContext} ctx Koa router's context.
 * @param {Function} next Next function.
 * @async
 */
async function getUserInformationByQuery(ctx, next) {
  let query = ctx.query
  if (query.id) {
    let information = await Member.getUserInformationByMemberId(query.id)
    console.log(information)
    if (information.length) {
      ctx.status = 200
      ctx.body = information[0]
    } else {
      ctx.status = 404
    }
  } else if (query.username) {
    let information = await Member.getUserInformationByUsername(query.username)
    if (information.length) {
      ctx.status = 200
      ctx.body = information[0]
    } else {
      ctx.status = 404
    }
  } else {
    return next()
  }
}

/**
 * Get the user's information by MEMBER id from JWT.
 * @param {IRouterContext} ctx Koa rounter's context.
 * @async
 */
async function getUserInformationByToken(ctx) {
  let information = await Member.getUserInformationByMemberId(ctx.state.memberId)
  if (information.length) {
    ctx.status = 200
    ctx.body = information[0]
  } else {
    ctx.status = 404
  }
}

/**
 * Modify user's profile.
 * @param {IRouterContext} ctx Koa's router context.
 * @async
 */
async function modifyUserProfile(ctx) {
  let result = await Member.modifyUserInformationByMemberId(ctx.state.memberId, ctx.request.body)

  if (result.success) {
    ctx.status = 204
  } else {
    ctx.status = 400
    ctx.body = {
      type: 'body',
      error: result.error
    }
  }
}

/**
 * Get the information of user's orders.
 * @param {IRouterContext} ctx Koa's router. context.
 * @async
 */
async function getOrdersInformation(ctx) {
  let result = await Member.getAllUserOrders(ctx.state.memberId, ctx.query.state)
  if (result.success) {
    ctx.status = 200
    ctx.body = { orders: result }
  } else {
    ctx.status = 400
    ctx.body = {
      type: 'query',
      error: result.error
    }
  }
}

/**
 * Get the information of user's goods.
 * @param {IRouterContext} ctx Koa's router. context.
 * @async
 */
async function getGoodsInformation(ctx) {
  let result = await Member.getAllUserGoods(ctx.state.memberId, ctx.query.state)
  if (result.success) {
    ctx.status = 200
    ctx.body = { goods: result }
  } else {
    ctx.status = 400
    ctx.body = {
      type: 'query',
      error: result.error
    }
  }
}

/**
* Passed login
*/
async function checkLogin(ctx) {
  ctx.status = 200
}

export default {
  getUserInformationByQuery,
  getUserInformationByToken,
  modifyUserProfile,
  getOrdersInformation,
  getGoodsInformation,
  checkLogin
}
