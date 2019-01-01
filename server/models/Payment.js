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

export default {
  createManyPayment
}
