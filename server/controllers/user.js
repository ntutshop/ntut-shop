import jwt from 'jsonwebtoken'
import Member from '../models/Member.js'
import { SERVER_CONFIG as SV_CONFIG } from '../config/config.js'

/**
 * Get the user's state.
 * @param {IRouterContext} ctx Context.
 * @async
 */
async function getUserState (ctx) {
  let response = {
    success: true,
    type: 'state',
    message: undefined
  }

  // Check whether header jwt is emtpy or not.
  let jwtToken = ctx.cookies.get('jwt')
  if (!jwtToken) {
    response.message = 'unauthorized'
    ctx.body = response
    return
  }

  // Verify jwt token.
  // The decoded user_id will be set on ctx.state.decodedUserId if verification succees.
  try {
    let userId = jwt.verify(jwtToken, SV_CONFIG.JWT_SECRET)
    switch (await Member.checkMemberStatus(userId)) {
      case Member.STATE.Normal:
        response.message = 'logged-in'
        ctx.body = response
        break
      case Member.STATE.Unregistered:
        response.message = 'unregistered'
        ctx.body = response
        break
      case Member.STATE.Unauthorized:
        response.message = 'unauthorized'
        ctx.body = response
        break
      default:
        throw new Error('Undefined user state.')
    }
  } catch (ex) {
    response.message = 'unauthorized'
    ctx.body = response
  }
}

/**
 * Passed login
 */
async function checkLogin(ctx) {
  ctx.status = 200
}

/**
 * Get a user's information.
 * @param {IRouterContext} ctx Context.
 * @async
 */
async function getUserInformation (ctx) {
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
async function modifyUserProfile (ctx) {
  let result = await Member.modifyUserInformationByUserId(ctx.state.userId, ctx.request.body)

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
async function getOrdersInformation (ctx) {
  try {
    let result = await Member.getAllUserOrders(ctx.state.userId, ctx.query.state)
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

export default {
  getUserState,
  getUserInformation,
  modifyUserProfile,
  getOrdersInformation,
  checkLogin
}
