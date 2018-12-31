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
    async update() {
      try {
        let { data } = await this.$axios.get('/user/information')
        this.$store.dispatch('setLoggedIn', true)
        this.$store.dispatch('setUserInfo', data)
      } catch (e) {
        const code = parseInt(e.response && e.response.status)
        if (code === 401) {
          this.$store.dispatch('setLoggedIn', false)
          this.$store.dispatch('setUserInfo', undefined)
        } else if (code === 403) {
          this.$store.dispatch('setLoggedIn', false)
          this.$store.dispatch('setUserInfo', undefined)
        } else if (code === 404) {
          this.$store.dispatch('setLoggedIn', false)
          this.$store.dispatch('setUserInfo', undefined)
        } else {
          throw e
        }
      }
    },
    async logout() {
      await this.$axios.post('/logout')
      this.update()
      this.$router.push('/')
    }
  }
}
</script>
