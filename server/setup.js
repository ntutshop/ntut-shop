import consola from 'consola'
import koaBody from 'koa-body'
import router from './routes/main.js'
import ntutdb from './config/db.js'

/**
 * Setup the Koa application.
 * @param {Koa} app Koa application.
 */
export default function (app) {
  app.use(koaBody({
    multipart: true,
    encoding: 'gzip',
    formidable: {
      maxFieldsSize: 5 * 1024 * 1024,
    }
  }))

  return new Promise((resolve, reject) => {
    // Check whether the connection is created or not.
    ntutdb
      .authenticate()
      .then(() => {
        consola.ready(`Connected to MariaDB.`)

        app.use(router.routes()).use(router.allowedMethods())

        resolve()
      })
      .catch(err => {
        consola.error(`Failed to connect to MariaDB:\n${err}`)
        reject(err)
      })
  })
}
