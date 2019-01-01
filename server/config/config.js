const DOMAIN = process.env.DOMAIN || 'virtualprism.io'
const DB_DOMAIN = (process.env.NODE_ENV === 'production') ? DOMAIN : 'virtualprism.io'

export let SERVER_CONFIG = {
  HOST: (process.env.NODE_ENV === 'production') ? '0.0.0.0' : 'localhost',
  PORT: 3000,
  JWT_SECRET: 'mysecret',
  MODE: process.env.NODE_ENV,
  BASE_URL: (process.env.NODE_ENV === 'production') ? `https://${DOMAIN}` : 'http://localhost:3000'
}

export let DB_CONFIG = {
  HOST: (process.env.DOCKER_ENV) ? 'mariadb' : DB_DOMAIN,
  USER: 'shopkeeper',
  PASSWORD: 'ycjls5dm',
  DATABASE: 'ntutdb',
  DIALECT: 'mysql'
}

export let FACEBOOK_CONFIG = {
  APP_ID: '444077546126314',
  APP_SECRET: '7676f48d1ae95328f3c4d99a1d1c9df5',
  CLIENT_TOKEN: '6452583eb0b6665e2f7e3a741a7e095f',
  REDIRECT_URI: `https://${DOMAIN}/api/oauth/facebook/callback`
}
