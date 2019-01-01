import db from '../config/db.js'
import ImageSchema from '../schemas/Image.js'

const Image = db.import('IMAGE', ImageSchema)

/**
 * Create many image urls.
 * @param {number} goodId Which good belong these images. A GOOD id.
 * @param {string[]} imageUrls All urls of images.
 * @async
 */
async function createManyImages(goodId, imageUrls) {
  let imagesData = imageUrls.map(url => ({
    good_id: goodId,
    path: url
  }))

  try {
    await Image.bulkCreate(imagesData)
    return { success: true }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export default {
  createManyImages
}