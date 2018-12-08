import consola from 'consola'
import ntutdb from './config/db'
import { DB_CONFIG } from './config/config.js'

/**
 * Setup the Koa application.
 * @param {Koa} app Koa application.
 */
export default function(app) {
  return new Promise((res, rej) => {
    // Check whether the connection is created or not.
    ntutdb
      .authenticate()
      .then(() => {
        consola.ready(`Connected to MariaDB.`)

        // TODO: Setup API routers.

        res()
      })
      .catch(err => {
        consola.error(`Failed to connect to MariaDB:\n${err}`)
        rej(err)
      })
  })
}
