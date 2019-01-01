import os from 'os'
import fs from 'fs'
import crypto from 'crypto'
import koaMulter from 'koa-multer'
import { SERVER_CONFIG as SV_CONFIG } from '../config/config.js'

let storage = koaMulter.diskStorage({
  destination: os.tmpdir(),
  filename(ctx, file, cb) {
    const filetype = file.originalname.split('.')[file.originalname.split('.').length - 1]
    cb(null, crypto.randomBytes(8).toString('hex') + '.' + filetype)
  }
})

let upload = koaMulter({ storage })

/**
 * Upload image.
 * @param {IRouterContext} ctx Context.
 * @async
 */
async function uploadImage(ctx) {
  try {
    await upload.single('file')(ctx)
  }
  catch (ex) {
    ctx.status = 403
    ctx.body = { reason: 'wrong field.' }
    return
  }

  const file = ctx.req.file

  if (file.size > 5 * 1024 * 1024) {
    ctx.status = 403
    ctx.body = { reason: 'oversize' }
    return
  }

  if (file.mimetype.split('/')[0] !== 'image') {
    ctx.status = 403
    ctx.body = { reason: 'invalid type' }
    return
  }

  const srcPath = file.path
  const distPath = __dirname + '/../public/images/' + file.filename

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
    url: SV_CONFIG.BASE_URL + '/images/' + file.filename
  }
}

export default {
  uploadImage
}
