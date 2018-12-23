import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import request from 'request'
import Member from '../models/Member.js'
import { FACEBOOK_CONFIG as FB_CONFIG, SERVER_CONFIG as SV_CONFIG } from '../config/config.js'

// const FB_LOGIN_URL = `https://www.facebook.com/v3.2/dialog/oauth?client_id=${FB_CONFIG.APP_ID}&redirect_uri=${FB_CONFIG.REDIRECT_URI}&state=vortex&scope=public_profile,email`
const HMAC_SHA256 = crypto.createHmac('sha256', FB_CONFIG.APP_SECRET)

/**
 * Check whether the user is new or not.
 * @param {string} userId An user_id from a Facebook account.
 * @private
 * @async
 */
async function CheckMemberRegister (userId) {
  let member = await Member.FindOneMemeberByUserId(userId)
  return !!member
}

/**
 * Retrive the access_token from Facebook by user's code.
 * @param {string} code Accessing code.
 * @return {Promise} The result of the request.
 * @private
 */
function RetriveAccessToken (code) {
  const ACCESS_URL = 'https://graph.facebook.com/v3.2/oauth/access_token?' +
    `client_id=${FB_CONFIG.APP_ID}&redirect_uri=${FB_CONFIG.REDIRECT_URI}&client_secret=${FB_CONFIG.APP_SECRET}&code=${code}`

  return new Promise((resolve, reject) => {
    request({
      method: 'GET',
      url: ACCESS_URL,
      json: true
    }, (error, response, body) => {
      error ? reject(error) : resolve(body)
    })
  })
}

/**
 * Retrive the user_id from Facebook by the access_token.
 * @param {string} accessToken The access_token.
 * @return {Promise} The result of the request.
 * @private
 */
function RetriveUserId (accessToken) {
  const APP_SECRET_PROOF = HMAC_SHA256.update(accessToken).digest('hex')
  const PROFILE_URL = 'https://graph.facebook.com/me?' +
    `access_token=${accessToken}&appsecret_proof=${APP_SECRET_PROOF}`

  return new Promise((resolve, reject) => {
    request({
      url: PROFILE_URL,
      method: 'GET',
      json: true
    }, (error, response, body) => {
      error ? reject(error) : resolve(body)
    })
  })
}

/**
 * An OAuth callback from Facebook.
 * @param {IRouterContext} ctx Context.
 * @async
 */
async function OAuthCallback (ctx) {
  if (!ctx.query.code) {
    console.error('Get no code in query.')
    return ctx.redirect('/')
  }

  // == Get user's token.
  let body = await RetriveAccessToken(ctx.query.code)

  // == Get the user_id from user's profile by the token.
  body = await RetriveUserId(body.access_token)

  // == Check the member
  if (await CheckMemberRegister(body.user_id)) {
    const JWT_TOKEN = jwt.sign(body.user_id, SV_CONFIG.JWT_SECRET)
    ctx.cookies.set('jwt', JWT_TOKEN)
    ctx.body = { success: true }
  } else {
    ctx.redirect('/signup')
  }
}

/**
 * Log out a user.
 * @param {IRouterContext} ctx Context.
 * @async
 */
async function Logout (ctx) {
  ctx.cookies.set('jwt')
  ctx.body = { success: true }
}

/**
 * Verify the jwt field in header.
 * @param {IRouterContext} ctx Context.
 * @param {Function} next Next middleware.
 * @async
 */
async function JWTVerification (ctx, next) {
  let jwtToken = ctx.cookies.get('jwt')

  if (jwtToken && jwt.verify(jwtToken, SV_CONFIG.JWT_SECRET)) {
    return next()
  } else {
    ctx.status = 401
    ctx.body = { message: 'Unauthorized action.' }
  }
}

export default {
  OAuthCallback,
  Logout,
  JWTVerification
}
