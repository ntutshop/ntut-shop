import Joi from 'joi'
import db from '../config/db.js'
import ShippingSchema from '../schemas/Shipping.js'

const Shipping = db.import('SHIPPING', ShippingSchema)

// Need a validator for validating `BasicShippingData`s.
// const SHIPPING_VALIDATOR

/**
 * @typedef BasicShippingData
 * @type {Object}
 * @description A JSON object contains a new shipping's basic data.
 * @property {string} service Service Name.
 * @property {number} fee Shipping's fee.
 */
/**
 * Create many shipping instances.
 * @param {number} goodId Which good has these shipping types.
 * @param {BasicShippingData[]} basicShippings Basic shipping data.
 */
async function createManyShippings (goodId, basicShippings) {
  let shippingsData = basicShippings.map(data => ({
    service: data.service,
    fee: data.fee,
    good_id: goodId
  }))

  try {
    // id is auto-increment
    await Shipping.bulkCreate(shippingsData)
    return { success: true }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export default {
  createManyShippings
}
