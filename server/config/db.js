import Sequelize from 'sequelize'
import { DB_CONFIG } from './config.js'

const ntutdb = new Sequelize(
  DB_CONFIG.DATABASE,
  DB_CONFIG.USER,
  DB_CONFIG.PASSWORD,
  {
    dialect: DB_CONFIG.DIALECT,
    host: DB_CONFIG.HOST,
    logging: false,
    define: {
      timestamps: false
    }
  }
)

export default ntutdb