<template>
  <v-layout
    column
    wrap
    fill-height
    justify-center
    align-center
  >
    <p class="display-1">您確定要登出嗎？</p>
    <v-btn
      class="mt-5"
      nuxt
      dark
      color="blue"
      large
      @click="logout"
    >登出</v-btn>
  </v-layout>
</template>

<script>
export default {
  methods: {
    async logout() {
      await this.$axios.post('/logout')
      this.$store.dispatch('updateUserState')
      this.$router.push('/')
    }
  }
}
</script>
