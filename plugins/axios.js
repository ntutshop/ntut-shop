export default function ({ $axios, error }) {
  $axios.onError(async e => {
    const code = parseInt(e.response && e.response.status)
    if (code === 401) {
      error({ statusCode: 401 })
    } else if (code === 403 && e.response.data.reason === 'unregistered') {
      error({ statusCode: 403, reason: 'unregistered' })
    } else if (code === 403 && e.response.data.reason === 'permission-denied') {
      error({ statusCode: 403, reason: 'permission-denied' })
    } else {
      throw e
    }
  })
}
