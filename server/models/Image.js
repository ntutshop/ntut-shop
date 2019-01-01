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

/**
 * Get images' url by a GOOD id.
 * @param {number} goodId The GOOD id.
 */
async function getImagesByGoodId (goodId) {
  return Image.findAll({
    where: { good_id: goodId },
    attributes: [ 'path' ]
  })
}

export default {
  createManyImages,
  getImagesByGoodId
}