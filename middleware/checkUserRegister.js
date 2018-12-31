export default async function ({ $axios }) {
  try {
    await $axios.get('/user/state/register')
  } catch (e) {
    console.log(e)
  }
}
