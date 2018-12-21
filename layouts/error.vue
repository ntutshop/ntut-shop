<template>
  <div>
    <h1 v-if="error.statusCode === 404">頁面不存在</h1>
    <h1 v-else>應用發生錯誤異常</h1>
    <nuxt-link to="/">首 頁</nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
