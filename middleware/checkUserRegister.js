export default async function ({ $axios, route, store, error }) {
  try {
    await $axios.get('/user/state/register')
  } catch (e) {
    const code = parseInt(e.response && e.response.status)
    if (code === 401) {
      store.dispatch('setLoggedIn', false)
      if (route.name !== 'index') error({ statusCode: 401 })
    } else if (code === 403 && e.response.data.reason === 'unregistered') {
      if (route.name !== 'signup') error({ statusCode: 403, message: 'unregistered' })
    } else {
      console.log('register error')
      throw e
    }
  }
}
