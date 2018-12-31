<template>
  <v-layout class="m-user">
    <v-flex v-if="loggedIn">
      <v-layout justify-center>
        <v-btn
          fab
          dark
          outline
          color="blue"
          @click="$router.push('/user/account')"
        >
          <v-avatar>
            <img
              v-if="avatar"
              :src="avatar"
            >
            <span v-else>{{ userInfo ? userInfo.nickname[0] : '?' }}</span>
          </v-avatar>
        </v-btn>
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
import { mapState } from 'vuex'
export default {
  data() {
    return {
      user: '',
      envMode: process.env.NODE_ENV,
      showDialog: false,
      userid: ''
    }
  },
  computed: {
    avatar() {
      if (this.userInfo) {
        if (this.userInfo.authority === 'Facebook') {
          return `https://graph.facebook.com/v3.2/${
            this.userInfo.user_id
          }/picture`
        }
      }
      return undefined
    },
    ...mapState(['loggedIn', 'userInfo'])
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
            this.$store.dispatch('updateUserState')
            this.$router.replace('/')
          } catch (e) {
            const code = parseInt(e.response && e.response.status)
            if (code === 401) {
              this.$store.dispatch('updateUserState')
              this.$nuxt.error({ statusCode: 401 })
            } else if (
              code === 403 &&
              e.response.data.reason === 'unregistered'
            ) {
              this.$store.dispatch('updateUserState')
              this.$router.push('/signup')
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
