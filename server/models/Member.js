import db from '../config/db.js'
import MemberSchema from '../schemas/Member.js'
import errorGen from '../modules/errorgen.js'
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
 * A JSON validator for users' profile.
 */
const PROFILE_VALIDATOR = Joi.object().required().keys({
  username: Joi.string()
    .required(),
  nickname: Joi.string()
    .empty(''),
  phone: Joi.string()
    .regex(/^\d{10,10}$/)
    .required(),
  email: Joi.string()
    .email()
    .required()
})

/**
 * Get a user's information by a user_id.
 * @param {string} userId An user_id from Facebook.
 * @async
 */
async function getUserInformationByUserId (userId) {
  return Member.findOne({
    where: {
      user_id: userId
    }
  })
}

/**
 * Get a user's information by a username.
 * @param {string} username Username.
 * @async
 */
async function getUserInformationByUsername (username) {
  return Member.findOne({
    where: { username }
  })
}

/**
 * Check a member's state by user_id.
 * @param {string} userId An user_id from Facebook.
 * @async
 */
async function checkMemberStatus (userId) {
  let member = await getUserInformationByUserId(userId)
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
async function createShellCustomer (userId) {
  return Member.create({
    // id is auto-increment
    user_id: userId,
    authority: 'Facebook',
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
 * @property {string} username Username.
 * @property {string} phone Phone number.
 * @property {string} email Email.
 * @property {string?} nickname Nickname. Optional.
 */
/**
 * Fill the shell customer with required information.
 * @param {string} userId The customer's Facebook user_id. It's used for query.
 * @param {ProfileData} data ProfileData.
 * @async
 */
async function fillShellCustomer (userId, data) {
  // Validate the data.
  let result = PROFILE_VALIDATOR.validate(data, { abortEarly: false })
  if (result.error) {
    return {
      success: false,
      error: errorGen(result.error.details)
    }
  }

  // Update the profile
  let value = result.value
  await Member.update({ // This statement can be replace by 'let queryResult = await ..' for checking the query result.
    username: value.username,
    phone: value.phone,
    email: value.email,
    nickname: value.nickname || value.username,
    register_time: sequelize.fn('NOW')
  }, {
    where: { user_id: userId },
    fields: [ 'username', 'phone', 'email', 'nickname', 'register_time' ]
  })
  return { success: true }
}

/**
 * Modify user's profile.
 * @param {string} userId The user's user_id.
 * @param {ProfileData} data The new profile data.
 * @async
 */
async function modifyUserInformationByUserId (userId, data) {
  // Validate the data.
  let result = PROFILE_VALIDATOR.validate(data, { abortEarly: false })

  if (result.error) {
    return {
      success: false,
      error: errorGen(result.error.details)
    }
  }

  // Update the profile
  let value = result.value
  await Member.update({ // This statement can be replace by 'let queryResult = await ..' for checking the query result.
    username: value.username,
    phone: value.phone,
    email: value.email,
    nickname: value.nickname || value.username
  }, {
    where: { user_id: userId },
    fields: [ 'username', 'phone', 'email', 'nickname' ]
  })
  return { success: true }
}

export default {
  getUserInformationByUserId,
  getUserInformationByUsername,
  checkMemberStatus,
  createShellCustomer,
  fillShellCustomer,
  modifyUserInformationByUserId,
  STATE
}
