import Joi from 'joi'
import db from '../config/db.js'
import GoodSchema from '../schemas/Good.js'
import errorGen from '../modules/errorgen.js'

/**
* A validator for GOOD.state.
* There are 3 possible values:
* 0. In stock
* 1. Out of stock
* 2. Removed
*/
export const STATE_VALIDATOR = Joi.number().min(0).max(2)

const Good = db.import('GOOD', GoodSchema)

/**
 * A json validator for GoodData.
 */
const GOODDATA_VALIDATOR = Joi.object().required().keys({
  name: Joi.string()
    .required(),
  description: Joi.string()
    .empty('').max(2000),
  price: Joi.number()
    .integer()
    .positive()
    .required(),
  stock: Joi.number()
    .integer()
    .positive()
    .required(),
  durability: Joi.number()
    .integer()
    .min(0)
    .max(10)
    .required()
})

/**
 * @typedef GoodData
 * @type {Object}
 * @description A JSON object contains a new good's basic data.
 * @property {string} name Name.
 * @property {string} description Product's description.
 * @property {number} price Price.
 * @property {number} stock The quantity of the good.
 * @property {number} durability The level of 'how new the product is'.
 */
/**
 * Publish a new product.
 * @param {number} memberId The user's MEMBER id.
 * @param {GoodData} data A data which records new product
 * @async
 */
async function publishNewGood (memberId, data) {
  let result = GOODDATA_VALIDATOR.validate(data, { abortEarly: false })

  if (result.error) {
    return {
      success: false,
      error: errorGen(result.error.details)
    }
  }

  let value = result.value
  let newGood = await Good.create({
    // id is auto-increment
    member_id: memberId,
    name: value.name,
    stock: value.stock,
    price: value.price,
    description: value.description || '',
    durability: value.durability,
    state: 0
    // publish_time uses the default yield function sequelize.fn('current_timestamp')
  })

  return {
    success: true,
    newGood
  }
}

/**
{
    "id": number,
    "name": string,
    "description": string,
    "price": number,
    "stock": number,
    "durability": number,
    "sellerId": number,
    "state": number,
    "publishTime": date,
    "images": [ string ],
    "tags": [ string ],
    "shippings":
    [
        {
            "id": number,
            "service": string,
            "fee": number
        }
    ],
    "payments":
    [
        {
            "id": number,
            "service": string
        }
    ]
}
**/

/**
 * Get a good's information.
 * @param {number} goodId The good's id.
 */
async function getGoodInformationById (goodId) {
  return await Good.findOne({ where: { id: goodId } })
}

export default {
  publishNewGood,
  getGoodInformationById,
  STATE_VALIDATOR
}