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
      <v-dialog
        v-if="envMode === 'development'"
        v-model="showDialog"
        persistent
        max-width="200"
      >
        <v-card @keyup.enter="fakeLogin">
          <v-card-text>
            <v-text-field
              ref="userid"
              v-model="userid"
              label="User ID"
            />
          </v-card-text>
          <v-card-actions>
            <v-btn
              block
              color="blue"
              dark
              @click="fakeLogin"
            >送出</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
          await this.$axios.post('/api/login', {
            authResponse: response.authResponse
          })
        },
        { scope: 'public_profile,email' }
      )
    },
    async fakeLogin() {
      window.location = `/api/dev/facebook_login?user_id=${this.userid}`
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
