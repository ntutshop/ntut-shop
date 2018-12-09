import consola from 'consola'
import ntutdb from './config/db'

/**
 * Setup the Koa application.
 * @param {Koa} app Koa application.
 */
export default function (app) {
  return new Promise((resolve, reject) => {
    // Check whether the connection is created or not.
    ntutdb
      .authenticate()
      .then(() => {
        consola.ready(`Connected to MariaDB.`)

        // TODO: Setup API routers.

        resolve()
      })
      .catch(err => {
        consola.error(`Failed to connect to MariaDB:\n${err}`)
        reject(err)
      })
  })
}
