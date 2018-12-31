export default async function ({ $axios, route, store, error }) {
  try {
    await $axios.get('/user/state/login')
  } catch (e) {
    const code = parseInt(e.response && e.response.status)
    if (code === 401) {
      store.dispatch('setLoggedIn', false)
      if (route.name !== 'index') error({ statusCode: 401 })
    } else {
      console.log('login error')
      throw e
    }
  }
}
