import jwt from 'jsonwebtoken'
import Member from '../models/Member.js'
import {
  SERVER_CONFIG as SV_CONFIG
} from '../config/config.js'

/**
 * An OAuth callback from Facebook.
 * @param {IRouterContext} ctx Context.
 * @async
 */
async function handleLogin (ctx) {
  let authResponse = ctx.request.body.authResponse

  // == Check fields
  if (!authResponse || !authResponse.userID) {
    ctx.status = 401
    return
  }

  // == Sign userID with key
  let uid = authResponse.userID
  const JWT_TOKEN = jwt.sign(uid, SV_CONFIG.JWT_SECRET)
  ctx.cookies.set('jwt', JWT_TOKEN)

  // == Check the member
  let state = await Member.checkMemberStatus(uid)
  if (state === Member.STATE.Normal) {
    ctx.status = 201
  } else if (state === Member.STATE.Unregistered) {
    ctx.status = 403
  } else {
    ctx.status = 403
    await Member.createShellCustomer(uid)
  }
}

/**
 * Verify the JWT token.
 * @param {IRouterContext} ctx Context.
 * @param {Function} next Next middleware.
 */
async function verifyJWTToken (ctx, next) {
  // Check whether header jwt is emtpy or not.
  let jwtToken = ctx.cookies.get('jwt')
  if (!jwtToken) {
    ctx.status = 401
    return
  }

  // Verify jwt token.
  // The decoded user_id will be set on ctx.state.userId if verification succees.
  try {
    ctx.state.userId = jwt.verify(jwtToken, SV_CONFIG.JWT_SECRET)
    return next()
  } catch (ex) {
    ctx.status = 401
  }
}

/**
 * Complete a member sign up.
 * This can be called only after VerifyJWTToken.
 * @param {IRouterContext} ctx Context.
 * @async
 */
async function handleSignup (ctx) {
  // Check whether the user is at unregistered state.
  let userId = ctx.state.userId
  let state = await Member.checkMemberStatus(userId)
  if (state === Member.STATE.Normal) {
    ctx.status = 403
    ctx.body = { reason: 'registered' }
  } else if (state == Member.STATE.Unauthorized ) {
    ctx.status = 401
  }

  // Validate the data.
  let body = ctx.request.body
  let result = await Member.fillShellCustomer(userId, body)

  if (result.success) {
    ctx.status = 201
  } else {
    ctx.status = 400
    ctx.body = {
      type: 'body',
      error: result.error
    }
  }
}

/**
 * Log out a user.
 * @param {IRouterContext} ctx Context.
 * @async
 */
async function handleLogout (ctx) {
  ctx.cookies.set('jwt')
  ctx.body = { success: true }
}

/**
 * Verify the jwt field in header.
 * This can be called only after VerifyJWTToken.
 * @param {IRouterContext} ctx Context.
 * @param {Function} next Next middleware.
 * @async
 */
async function verifyUserState (ctx, next) {
  let userId = ctx.state.userId
  let state = await Member.checkMemberStatus(userId)

  if (state === Member.STATE.Normal) {
    return next()
  } else if (state == Member.STATE.Unauthorized ) {
    ctx.status = 401
  } else {
    ctx.status = 403
    ctx.body = { reason: 'unregistered' }
  }
}

export default {
  handleLogin,
  verifyJWTToken,
  handleSignup,
  handleLogout,
  verifyUserState
}
