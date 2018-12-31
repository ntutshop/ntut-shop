import fs from 'fs'
import crypto from 'crypto'
import { SERVER_CONFIG as SV_CONFIG } from '../config/config.js'

/**
 * Upload image.
 * @param {IRouterContext} ctx Context.
 * @async
 */
async function uploadImage(ctx) {
  let file = Object.values(ctx.request.files)[0]

  if (file.size > 500 * 1024) {
    ctx.status = 403
    ctx.body = { reason: 'oversize' }
    return
  }

  if (file.type.split('/')[0] !== 'image') {
    ctx.status = 403
    ctx.body = { reason: 'invalid type' }
    return
  }

  let filetype = file.name.split('.')[1] || file.type.split('/')[1]
  let filename = crypto.randomBytes(8).toString('hex') + '.' + filetype
  let srcPath = file.path
  let distPath = __dirname + '/../public/images/' + filename

  const copy = async (srcPath, distPath) => {
    return new Promise((resolve, reject) => {
      fs.copyFile(srcPath, distPath, (err) => {
        if (err) {
          reject()
        }
        resolve()
      })
    })
  }

  await copy(srcPath, distPath)

  ctx.status = 201
  ctx.body = {
    url: SV_CONFIG.BASE_URL + '/images/' + filename
  }
}

export default {
  uploadImage
}
