import Joi from 'joi'
import db from '../config/db.js'
import GoodSchema from '../schemas/Good.js'
import OrderSchema from '../schemas/Order.js'
import errorGen from '../modules/errorgen.js'

/**
 * A validator for ORDER.state.
 * There are 6 possible values:
 * 0. Verifing
 * 1. In transaction
 * 2. Finished
 * 3. Rejected
 * 4. Cancelled by the buyer.
 * 5. Cancelled by the seller.
 */
export const STATE_VALIDATOR = Joi.number().min(0).max(5)

const Good = db.import('GOOD', GoodSchema)
const Order = db.import('ORDER', OrderSchema)

/**
 * A json validator for OrderData.
 */
const ORDERDATA_VALIDATOR = Joi.object().required().keys({
  shippingId: Joi.number()
    .required(),
  paymentId: Joi.number()
    .required(),
  goodId: Joi.number()
    .required(),
  quantity: Joi.number()
    .integer()
    .positive()
    .required()
})

/**
 * @typedef OrderData
 * @type {Object}
 * @description A JSON object contains a new order's basic data.
 * @property {number} shippingId Order's shipping's id.
 * @property {number} paymentId Order's payment's id.
 * @property {number} goodId Order's good's id.
 * @property {number} quantity Order's good's quantity.
 */
/**
 * Publish a new product.
 * @param {number} memberId The user's MEMBER id.
 * @param {OrderData} data A data which records new order
 * @async
 */
async function publishNewOrder(memberId, data) {
  data.goodId = data.good.id
  data.quantity = data.good.quantity
  delete data.good

  let result = ORDERDATA_VALIDATOR.validate(data, { abortEarly: false })

  if (result.error) {
    return {
      success: false,
      error: errorGen(result.error.details)
    }
  }

  let value = result.value
  let good = await Good.findOne({ where: { id: value.goodId } })
  if (!good) {
    return {
      success: false,
      error: { goodId: '"goodId" is not exist' }
    }
  }

  let total = good.toJSON().price * value.quantity
  let newOrder = await Order.create({
    // id is auto-increment
    member_id: memberId,
    shipping_id: value.shippingId,
    payment_id: value.paymentId,
    good_id: value.goodId,
    quantity: value.quantity,
    total: total,
    state: 0
    // transaction_time uses the default yield function sequelize.fn('current_timestamp')
  })

  return {
    success: true,
    newOrder
  }
}

/**
 * Get a order's information.
 * @param {number} orderId The order's id.
 */
async function getOrderInformationById(orderId) {
  return await Order.findOne({ where: { id: orderId } })
}

export default {
  publishNewOrder,
  getOrderInformationById,
  STATE_VALIDATOR
}
