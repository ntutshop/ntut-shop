import db from '../config/db.js'
import PaymentSchema from '../schemas/Payment.js'

const Payment = db.import('PAYMENT', PaymentSchema)

/**
 * Create many payments.
 * @param {number} goodId Which good has these payments types. A GOOD id.
 * @param {string[]} services All services' name.
 * @async
 */
async function createManyPayment (goodId, services) {
  let paymentsData = services.map(service => ({
    good_id: goodId,
    service
  }))

  try {
    // id is auto-increment
    await Payment.bulkCreate(paymentsData)
    return { success: true }
  } catch (error) {
    console.log(error)
    throw error
  }
}

/**
 * Get a payment by a PAYMENT id.
 * @param {number} goodId The PAYMENT id.
 */
async function getPaymentById (id) {
  return Payment.findOne({
    where: { good_id: id },
    attributes: [ 'id', 'service' ]
  })
}

/**
 * Get payments by a GOOD id.
 * @param {number} goodId The GOOD id.
 */
async function getPaymentsByGoodId (goodId) {
  return Payment.findAll({
    where: { good_id: goodId },
    attributes: [ 'id', 'service' ]
  })
}

export default {
  createManyPayment,
  getPaymentById,
  getPaymentsByGoodId
}
