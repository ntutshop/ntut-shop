<template>
  <v-layout class="m-user">
    <v-flex v-if="user">
      <v-layout justify-center>
        <avatar
          :username="user"
          size="40"
          color="#FFF"
          background-color="#409eff"
        />
      </v-layout>
    </v-flex>
    <v-flex v-else>
      <v-layout justify-end>
        <el-button
          type="primary"
          class="blue"
          round
          @click="login"
        >登入</el-button>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import Avatar from 'vue-avatar'
export default {
  components: {
    Avatar
  },
  data() {
    return {
      user: '',
      envMode: process.env.NODE_ENV,
      showDialog: false,
      userid: ''
    }
  },
  methods: {
    login() {
      /* global FB */
      FB.login(
        async response => {
          try {
            await this.$axios.post('/login', {
              authResponse: response.authResponse
            })
            this.$router.replace('/')
          } catch (e) {
            const code = parseInt(e.response && e.response.status)
            if (code === 401) {
              store.dispatch('setLoggedIn', false)
              this.$nuxt.error({ statusCode: 401 })
            } else if (
              code === 403 &&
              e.response.data.reason === 'unregistered'
            ) {
              this.$nuxt.error({ statusCode: 403, message: 'unregistered' })
            } else {
              throw e
            }
          }
        },
        { scope: 'public_profile,email' }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  color: #409eff;
}
.register {
  margin-left: 10px;
}
</style>
