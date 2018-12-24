import db from '../config/db.js'
import MemberSchema from '../schemas/Member.js'
import Joi from 'joi'
import sequelize from 'sequelize'

const Member = db.import('MEMBER', MemberSchema)

/**
 * Members' state.
 * @member {Symbol} Unauthorized A user hasn't passed OAuth.
 * @member {Symbol} Unregistered A user hasn't given one's profile like username, nickname, etc, but has passed OAuth.
 * @member {Symbol} Normal A user both passed OAuth and registered.
 * @enum
 */
const STATE = Object.freeze({
  /**
   * A user hasn't passed OAuth.
   */
  Unauthorized: Symbol('Unauthorized'),

  /**
   * A user hasn't given one's profile like username, nickname, etc, but has passed OAuth.
   */
  Unregistered: Symbol('Unregistered'),

  /**
   * A user both passed OAuth and registered.
   */
  Normal: Symbol('Normal')
})

/**
 * A JSON validator for function FillShellCustomerMember.
 */
const PROFILE_VALIDATOR = Joi.object().keys({
  username: Joi.string()
    .required(),
  nickname: Joi.string(),
  phone: Joi.string()
    .regex(/^\d{10,10}$/)
    .required(),
  email: Joi.string()
    .email()
    .required()
})

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
 * Check a member's state by user_id.
 * @param {string} userId An user_id from Facebook.
 * @async
 */
async function CheckMemberStatus (userId) {
  let member = await FindOneMemeberByUserId(userId)
  if (!member) {
    return STATE.Unauthorized
  } else if (member.username === '') {
    return STATE.Unregistered
  } else {
    return STATE.Normal
  }
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
 * @typedef ProfileData
 * @type {Object}
 * @description A JSON object contains a new user's basic data.
 * @param {string} username Username.
 * @param {string} phone Phone number.
 * @param {string} email Email.
 * @param {string?} nickname Nickname. Optional.
 */
/**
 * Fill the shell customer with required information.
 * @param {string} userId The customer's Facebook user_id. It's used for query.
 * @param {ProfileData} data ProfileData.
 * @async
 */
async function FillShellCustomer (userId, data) {
  // Validate the data.
  let result = PROFILE_VALIDATOR.validate(data)
  if (result.error) {
    return {
      success: false,
      error: result.error.details[0]
    }
  }

  // Update the profile
  let value = result.value
  await Member.update({ // This statement can be replace by 'let queryResult = await ..' for checking the query result.
    username: value.username,
    phone: value.phone,
    email: value.email,
    nickname: value.nickname,
    register_time: sequelize.fn('NOW')
  }, {
    where: { user_id: userId }
  })
  return { success: true }
}

export default {
  FindOneMemeberByUserId,
  CheckMemberStatus,
  CreateShellCustomer,
  FillShellCustomer,
  STATE
}
