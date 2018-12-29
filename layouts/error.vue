<template>
  <v-layout
    column
    wrap
    fill-height
    justify-center
    align-center
  >
    <p
      v-if="error.statusCode === 404"
      class="display-1">OOPS！找不到這個頁面</p>
    <p
      v-else
      class="display-1">{{ error.message || '未知的錯誤' }}</p>
    <v-btn
      class="mt-5"
      nuxt
      dark
      color="blue"
      large
      to="/">回首頁</v-btn>
  </v-layout>
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
