<template>
  <div class="m-user">
    <template v-if="user">
      歡迎您，<span class="username">{{ user }}</span>
      [<nuxt-link to="/exit">退出</nuxt-link>]
    </template>
    <template v-else>
      <nuxt-link
        to="/login"
        class="login">立即登錄</nuxt-link>
      <nuxt-link
        to="/login"
        class="register">註冊</nuxt-link>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: ''
    }
  }
}
</script>

<style lang="scss">
.login {
  color: #409eff;
}
.register {
  margin-left: 10px;
}
</style>
