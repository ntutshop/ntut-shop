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
          console.log(response.authResponse)
          let { data } = await this.$axios.post('/login', {
            authResponse: response.authResponse
          })
          if (data.redirect) {
            if (data.redirect === '/signup') {
              this.$router.replace('/signup')
            } else {
              this.$router.replace('')
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
