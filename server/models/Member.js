import db from '../config/db.js'
import MemberSchema from '../schemas/Member.js'
import { STATE_VALIDATOR as ORDER_STATE_VALIDATOR } from '../models/Order.js'
import { STATE_VALIDATOR as GOOD_STATE_VALIDATOR } from '../models/Good.js'
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
    .required()
    .regex(/^[a-zA-Z0-9]*$/)
    .min(6)
    .max(25),
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
 * Get a user's information by a MEMBER id.
 * @param {number} memberId MEMBER id.
 */
async function getUserInformationByMemberId(memberId) {
  return db.query(`
    SELECT id, user_id, authority, username, nickname, phone, email, certificated, permission, register_time, rate_count, rate_average
    FROM MEMBER AS M, (
      SELECT COUNT(*) AS rate_count, FLOOR(AVG(stars)) AS rate_average
      FROM RATE
      WHERE RATE.target_id = :memberId
    ) AS R
    WHERE M.id = :memberId;
  `, { replacements: { memberId }, type: db.QueryTypes.SELECT })
}

/**
 * Get a user's information by a username.
 * @param {string} username Username.
 * @async
 */
async function getUserInformationByUsername(username) {
  return db.query(`
  SELECT id, user_id, authority, username, nickname, phone, email, certificated, permission, register_time, rate_count, rate_average
  FROM MEMBER AS M, (
    SELECT COUNT(*) AS rate_count, FLOOR(AVG(stars)) AS rate_average
    FROM RATE
    WHERE RATE.target_id = ( SELECT id FROM MEMBER WHERE username = :username )
  ) AS R
  WHERE M.username = :username;
`, { replacements: { username }, type: db.QueryTypes.SELECT })
}

/**
 * Get member's state by MEMBER id.
 * @param {number} memberId MEMBER id.
 * @return {Promise<STATE>} Symbol. The user's state.
 * @async
 */
async function checkMemberStateByMemberId(memberId) {
  let member = await getUserInformationByMemberId(memberId)
  if (!member) {
    return STATE.Unauthorized
  } else if (!member[0].username) {
    return STATE.Unregistered
  } else {
    return STATE.Normal
  }
}

/**
 * Get a member's state and id by user_id.
 * @param {string} userId An user_id from Facebook.
 * @return {Promise<STATE, number?>} The user state and member id from MEMBER table.
 * @async
 */
async function checkMemberStateAndIdByUserId(userId) {
  let member = await Member.findOne({ where: { user_id: userId } })
  if (!member) {
    return [STATE.Unauthorized, undefined]
  } else if (!member.username) {
    return [STATE.Unregistered, member.id]
  } else {
    return [STATE.Normal, member.id]
  }
}

/**
 * Create a new MEMBER instance. Only some columns of the instance are filled for initialization.
 * @param {string} userId A user_id from Facebook.
 * @async
 */
async function createShellCustomer(userId) {
  return Member.create({
    // id is auto-increment
    user_id: userId,
    authority: 'Facebook',
    username: null,
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
 * @param {string} memberId The MEMBER id.
 * @param {ProfileData} data ProfileData.
 * @async
 */
async function fillShellCustomer(memberId, data) {
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
  try {
    await Member.update({ // This statement can be replace by 'let queryResult = await ..' for checking the query result.
      username: value.username,
      phone: value.phone,
      email: value.email,
      nickname: value.nickname || value.username,
      register_time: sequelize.fn('NOW')
    }, {
        where: { id: memberId },
        fields: ['username', 'phone', 'email', 'nickname', 'register_time']
      })
  } catch (ex) {
    let fisrtError = ex.errors[0]
    // This should be processed by an error object converter.
    if (fisrtError.type === 'unique violation') {
      return {
        success: false,
        error: { username: "指定的使用者名稱已被其他使用者使用，請改成其他名稱。" }
      }
    } else {
      throw ex
    }
  }
  return { success: true }
}

/**
 * Modify user's profile.
 * @param {string} memberId The user's MEMBER id.
 * @param {ProfileData} data The new profile data.
 * @async
 */
async function modifyUserInformationByMemberId(memberId, data) {
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
  try {
    await Member.update({ // This statement can be replace by 'let queryResult = await ..' for checking the query result.
      username: value.username,
      phone: value.phone,
      email: value.email,
      nickname: value.nickname || value.username
    }, {
        where: { id: memberId },
        fields: ['username', 'phone', 'email', 'nickname']
      })
  } catch (ex) {
    let fisrtError = ex.errors[0]
    // This should be processed by an error object converter.
    if (fisrtError.type === 'unique violation') {
      return {
        success: false,
        error: { username: "指定的使用者名稱已被其他使用者使用，請改成其他名稱。" }
      }
    } else {
      throw ex
    }
  }
  return { success: true }
}

/**
 * Get all the user's orders.
 * @param {number} memberId The user's memberId.
 * @param {number} state Orders' state. It's used to find the orders with specified state.
 * @async
 */
async function getAllUserOrders(memberId, state) {
  let stateCondition = state ? ' AND A.state = :state' : ''

  let result = ORDER_STATE_VALIDATOR.validate(state)

  if (result.error) {
    return {
      success: false,
      error: { state: "數值必須介於 0 ~ 5 之間。" }
    }
  }

  let { goods } = await getAllUserGoods(memberId, undefined)
  let sellerCondition = ''
  if (goods.length) {
    for (let good of goods) {
      sellerCondition += ` OR good_id = ${good.id}`
    }
  }

  let orders = await db.query(`
    SELECT id, state, transaction_time, shipping_id, payment_id
    FROM \`ORDER\`
    WHERE (member_id = :memberId${stateCondition})${sellerCondition}`,
    { replacements: { memberId, state }, type: db.QueryTypes.SELECT, nest: true })

  return {
    success: true,
    orders
  }
}

/**
 * Get all the user's goods.
 * @param {number} memberId The user's memberId.
 * @param {number} state Goods' state. It's used to find the goods with specified state.
 * @async
 */
async function getAllUserGoods(memberId, state) {
  let stateCondition = state ? 'AND A.state = :state' : ''

  let result = GOOD_STATE_VALIDATOR.validate(state)

  if (result.error) {
    return {
      success: false,
      error: { state: "數值必須介於 0 ~ 2 之間。" }
    }
  }

  let goods = await db.query(`
    SELECT id, name, stock, price, durability, state, publish_time
    FROM GOOD
    WHERE member_id = :memberId ${stateCondition}`,
    { replacements: { memberId, state }, type: db.QueryTypes.SELECT, nest: true })

  return {
    success: true,
    goods
  }
}

export default {
  getUserInformationByMemberId,
  getUserInformationByUsername,
  checkMemberStateByMemberId,
  checkMemberStateAndIdByUserId,
  createShellCustomer,
  fillShellCustomer,
  modifyUserInformationByMemberId,
  getAllUserOrders,
  getAllUserGoods,
  STATE
}
