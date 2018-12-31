export default async function ({ $axios }) {
  try {
    await $axios.get('/user/state/login')
  } catch (e) {
    console.log(e)
  }
}
