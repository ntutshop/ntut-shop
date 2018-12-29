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
  if (!authResponse || !authResponse.userId) {
    ctx.body = {
      success: false,
      type: 'body',
      message: !authResponse ? 'no-authResponse' : 'no-userId'
    }
  }

  // == Sign userID with key
  let uid = authResponse.userID
  const JWT_TOKEN = jwt.sign(uid, SV_CONFIG.JWT_SECRET)
  ctx.cookies.set('jwt', JWT_TOKEN)

  // == Check the member
  let state = await Member.checkMemberStatus(uid)
  if (state === Member.STATE.Normal) {
    ctx.body = {
      success: true,
      redirect: '/'
    }
  } else if (state === Member.STATE.Unregistered) {
    ctx.body = {
      success: true,
      redirect: '/signup'
    }
  } else {
    ctx.status = 201
    await Member.createShellCustomer(uid)
    ctx.body = {
      success: true,
      redirect: '/signup'
    }
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
    ctx.body = {
      success: false,
      type: 'authorization',
      message: 'empty'
    }
    return
  }

  // Verify jwt token.
  // The decoded user_id will be set on ctx.state.decodedUserId if verification succees.
  try {
    ctx.state.userId = jwt.verify(jwtToken, SV_CONFIG.JWT_SECRET)
    return next()
  } catch (ex) {
    ctx.body = {
      success: false,
      type: 'authorization',
      message: 'invalid'
    }
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
  if (state !== Member.STATE.Unregistered) {
    ctx.body = {
      success: false,
      type: 'state',
      message:
        state === Member.STATE.Unauthorized ? 'unauthorized' : 'logged-in'
    }
    return
  }

  // Validate the data.
  let body = ctx.request.body
  let result = await Member.fillShellCustomer(userId, body)

  if (result.success) {
    ctx.status = 201
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
  } else {
    ctx.body = {
      success: false,
      type: 'state',
      message:
        state === Member.STATE.Unauthorized ? 'unauthorized' : 'unregistered'
    }
  }
}

export default {
  handleLogin,
  verifyJWTToken,
  handleSignup,
  handleLogout,
  verifyUserState
}
