import db from '../config/db.js'
import MemberSchema from '../schemas/Member.js'
import sequelize from 'sequelize'

const Member = db.import('MEMBER', MemberSchema)

/**
 * Try to find a member by user_id.
 * @param {string} userId An user_id from Facebook.
 * @async
 */
async function FindOneMemeberByUserId (userId) {
  return Member.findOne({
    where: {
      user_id: userId
    }
  })
}

/**
 * Check whether the user_id exist in MEMBER table.
 * @param {string} userId An user_id from Facebook.
 */
async function CheckMemberExisting (userId) {
  return await Member.count({ where: { user_id: userId } }) > 0
}

/**
 * Create a new MEMBER instance. Only some columns of the instance are filled for initialization.
 * @param {string} userId A user_id from Facebook.
 * @async
 */
async function CreateShellCustomer (userId) {
  return Member.create({
    // id is auto-increment
    user_id: userId,
    username: '',
    nickname: '',
    phone: '',
    email: '',
    certificated: false,
    permission: 0
    // register_time uses the default yield function sequelize.fn('current_timestamp')
  })
}

/**
 * Fill the shell customer with required information.
 * @param {string} userId The customer's Facebook user_id. It's used for query.
 * @param {string} username Username.
 * @param {string} phone Phone number.
 * @param {string} email Email.
 * @param {string?} nickname Nickname. Optional.
 */
async function FillShellCustomer (userId, username, phone, email, nickname = '') {
  return Member.update({
    username,
    phone,
    email,
    nickname,
    register_time: sequelize.fn('NOW')
  }, {
    where: { user_id: userId }
  })
}

export default {
  FindOneMemeberByUserId,
  CheckMemberExisting,
  CreateShellCustomer,
  FillShellCustomer
}
