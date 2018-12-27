// Note:
// The following methods are used ONLY when the SERVER_CONFIG.MODE === 'development' in config.js
import consola from 'consola'
import jwt from 'jsonwebtoken'
import Member from '../models/Member.js'
import { SERVER_CONFIG as SV_CONFIG } from '../config/config.js'

/**
 * A fake Facebook login.
 * Facebook OAuth requires HTTPS protocol, causing developers the need of a public IP, a domain name and a SSL key.
 * So this method is used to simulate Facebook OAuth callback without the requirement.
 * It make both front-end and back-end developer easier to develop and test.
 * @param {IRouterContext} ctx Context.
 * @async
 */
async function FakeFacebookLogin (ctx) {
  let userId = ctx.query.user_id

  if (!userId) {
    consola.error('Got no user_id in query.')
    return ctx.redirect('/') // *It should change to an error page.
  }

  // == Sign user_id with key
  const JWT_TOKEN = jwt.sign(userId, SV_CONFIG.JWT_SECRET)
  ctx.cookies.set('jwt', JWT_TOKEN)

  // == Check the member
  let state = await Member.CheckMemberStatus(userId)
  if (state === Member.STATE.Normal) {
    ctx.redirect(SV_CONFIG.BASE_URL)
  } else if (state === Member.STATE.Unregistered) {
    ctx.redirect(SV_CONFIG.BASE_URL + '/signup')
  } else {
    await Member.CreateShellCustomer(userId)
    ctx.redirect(SV_CONFIG.BASE_URL + '/signup')
  }
}

export default {
  FakeFacebookLogin
}
