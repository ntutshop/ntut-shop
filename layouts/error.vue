<template>
  <v-layout
    column
    wrap
    fill-height
    justify-center
    align-center
  >
    <template>
      <p
        v-if="error.statusCode === 403 && error.reason === 'unregistered'"
        class="display-1">OOPS！您尚未完成基本資料填寫</p>
      <v-btn
        class="mt-5"
        nuxt
        dark
        color="blue"
        large
        to="/signup">填寫資料</v-btn>
    </template>
    <template>
      <p
        v-if="error.statusCode === 401"
        class="display-1">OOPS！您尚未登入</p>
      <p
        v-if="error.statusCode === 403 && error.reason === 'registered'"
        class="display-1">OOPS！您已經完成基本資料填寫</p>
      <p
        v-if="error.statusCode === 403 && error.reason === 'permission-denied'"
        class="display-1">OOPS！您沒有權限進行此操作</p>
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
    </template>
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
