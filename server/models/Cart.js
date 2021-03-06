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

  let itemsId = data.goods.map(good => good.id)
  let existedItemsId =  await Cart.findAll({ where: { member_id: memberId } })
  existedItemsId = existedItemsId.map(item => item.good_id)
  for (let existedItemId of existedItemsId) {
    if (itemsId.indexOf(existedItemId) === -1) {
      let cartItem = await Cart.findOne({ where: { good_id: existedItemId } })
      await cartItem.destroy()
    }
  }

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
        await cartGood.update({
          quantity: item.quantity,
          shipping_id: item.shipping_id,
          payment_id: item.payment_id
        })
      }
      else {
        await cartGood.destroy()
      }
    }
    else {
      if (item.quantity) {
        await Cart.create({
          // id is auto-increment
          member_id: memberId,
          good_id: item.id,
          quantity: item.quantity,
          shipping_id: item.shipping_id,
          payment_id: item.payment_id
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
  let items = await Cart.findAll({ where: { member_id: memberId } })
  return items.map(item => ({
    id: item.good_id,
    quantity: item.quantity,
    shipping_id: item.shipping_id,
    payment_id: item.payment_id
  }))
}

export default {
  patchCartGoods,
  getCartGoodsByMemberId
}