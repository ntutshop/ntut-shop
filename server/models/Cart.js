import Joi from 'joi'
import db from '../config/db.js'
import GoodSchema from '../schemas/Good.js'
import CartSchema from '../schemas/ShoppingCart.js'
import errorGen from '../modules/errorgen.js'

const Good = db.import('GOOD', GoodSchema)
const Cart = db.import('SHOPPING_CART', CartSchema)

/**
 * A json validator for CartData.
 */
// const CARTDATA_VALIDATOR = Joi.array().required().items(
//   Joi.object().keys({
//     goodId: Joi.number()
//       .required(),
//     quantity: Joi.number()
//       .integer()
//       .positive()
//       .required()
//   })
// )

/**
 * @typedef CartData
 * @type {Object}
 * @description A JSON object contains a new order's basic data.
 * @property {number} goodId Cart's good's id.
 * @property {number} quantity Cart's good's quantity.
 */
/**
 * Publish a new product.
 * @param {number} memberId The user's MEMBER id.
 * @param {OrderData} data A data which records new order
 * @async
 */
async function patchCartGoods(memberId, data) {
  // let result = CARTDATA_VALIDATOR.validate(data, { abortEarly: false })

  // if (result.error) {
  //   return {
  //     success: false,
  //     error: errorGen(result.error.details)
  //   }
  // }

  let items = data.goods
  for (let i in items) {
    let item = items[i]
    let good = await Good.findOne({ where: { id: item.id } })
    if (!good) {
      return {
        success: false,
        error: { 'good.id': '"good.id" is not exist' }
      }
    }
  }

  for (let i in items) {
    let item = items[i]
    let cartGood = await Cart.findOne({ where: { member_id: memberId, good_id: item.id } })
    if (cartGood) {
      if (item.quantity) {
        console.log(1)
      }
      else {
        console.log(2)
      }
    }
    else {
      if (item.quantity) {
        await Cart.create({
          // id is auto-increment
          member_id: memberId,
          good_id: item.id,
          quantity: item.quantity,
        })
      }
    }
  }

  return {
    success: true,
    goods: await getCartGoodsByMemberId(memberId)
  }
}

/**
 * Get a cart's goods' information.
 * @param {number} memberId The good's id.
 */
async function getCartGoodsByMemberId(memberId) {
  return await Cart.findAll({ where: { member_id: memberId } })
}

export default {
  patchCartGoods,
  getCartGoodsByMemberId
}