import db from '../config/db.js'
import TagSchema from '../schemas/Tag.js'

const Tag = db.import("TAG", TagSchema)

/**
 * Create many tags.
 * @param {number} goodId The user's MEMBER id.
 * @param {string[]} names Tags' name.
 */
async function createManyTags (goodId, names) {
  let tagsData = names.map(name => ({
    good_id: goodId,
    name
  }))

  try {
    await Tag.bulkCreate(tagsData)
    return { success: true }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export default {
  createManyTags
}
