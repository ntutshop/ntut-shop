import Member from '../models/Member.js'

/**
 * Get a user's information.
 * @param {IRouterContext} ctx Context.
 * @async
 */
async function getUserInformation(ctx) {
  let query = ctx.query
  let information

  if (query.username) {
    information = await Member.getUserInformationByUsername(query.username)
  } else {
    information = await Member.getUserInformationByUserId(ctx.state.userId)
  }

  if (information) {
    ctx.body = information
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
    ctx.body = { success: true }
  } else {
    ctx.body = {
      success: false,
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
  try {
    let result = await Member.getAllUserOrders(ctx.state.memberId, ctx.query.state)
    ctx.status = 200
    ctx.body = { orders: result }
  } catch (error) {
    ctx.status = 400
    ctx.body = {
      type: 'query',
      error: error
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
  getUserInformation,
  modifyUserProfile,
  getOrdersInformation,
  checkLogin
}
