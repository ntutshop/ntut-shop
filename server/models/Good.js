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
 * Get a good's information.
 * @param {number} goodId The good's id.
 */
async function getGoodInformationById (goodId) {
  return await Good.findOne({ where: { id: goodId } })
}

/**
 * Get goods with condtions.
 * @param {QueryObject} query A query object.
 */
async function getGoodsByConditions (query) {
  const OP = db.Op
  let queryObject = {
    attributes: [ 'id', 'name', 'price', 'stock', 'durability', 'member_id', 'state', 'publish_time' ],
    where: {}
  }

  if (query.sort)
    queryObject.order = [[ query.sort, query.sort_type || 'DESC' ]]

  if (query.price_start && query.price_end) {
    queryObject.where['price'] = {
      [OP.between]: [query.price_start, query.price_end]
    }
  } else if (query.price_start) {
    queryObject.where['price'] = {
      [OP.gte]: query.price_start
    }
  } else if (query.price_end) {
    queryObject.where['price'] = {
      [OP.lte]: query.price_end
    }
  }

  if (query.time_start && query.time_end) {
    queryObject.where['publish_time'] = {
      [OP.between]: [query.time_start, query.time_end]
    }
  } else if (query.time_start) {
    queryObject.where['publish_time'] = {
      [OP.gte]: query.time_start
    }
  } else if (query.time_end) {
    queryObject.where['publish_time'] = {
      [OP.lte]: query.time_end
    }
  }

  if (query.keyword) {
    queryObject.where['name'] = {
      [OP.like]: '%' + query.keyword + '%'
    }
  }

  return Good.findAll(queryObject)
}

export default {
  publishNewGood,
  getGoodInformationById,
  getGoodsByConditions,
  STATE_VALIDATOR
}