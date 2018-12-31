export default function ({ $axios, error }) {
  $axios.onError(e => {
    if (e.code === 401) {
      error('OOPS！您尚未登入')
    }
  })
}
