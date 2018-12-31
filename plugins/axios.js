export default function ({ $axios, error, store }) {
  $axios.onResponseError(async e => {
    const code = parseInt(e.response && e.response.status)
    if (code === 401) {
      store.dispatch('setLoggedIn', false)
      error({ statusCode: 401 })
    } else if (code === 403 && e.response.data.reason === 'unregistered') {
      error({ statusCode: 403, message: 'unregistered' })
    } else if (code === 403 && e.response.data.reason === 'permission-denied') {
      error({ statusCode: 403, message: 'permission-denied' })
    } else if (code === 403 && e.response.data.reason === 'registered') {
      error({ statusCode: 403, message: 'registered' })
    } else {
      throw e
    }
  })
}
