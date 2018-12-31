import Joi from 'joi'

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

export default {
  STATE_VALIDATOR
}
