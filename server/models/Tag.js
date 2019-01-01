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

/**
 * Get tags by a GOOD id.
 * @param {number} goodId The GOOD id.
 * @async
 */
async function getTagsByGoodId (goodId) {
  return Tag.findAll({
    where: { good_id: goodId },
    attributes: [ 'name' ]
  })
}

export default {
  createManyTags,
  getTagsByGoodId
}
