<template>
  <v-container>
    <v-layout
      row
      wrap
      justify-center
    >
      <v-card
        width="500"
        class="pa-4"
      >
        <v-card-title
          class="headline"
          primary-title
        >
          完成個人資訊填寫
        </v-card-title>
        <v-card-text>
          <v-layout
            row
            wrap
          >
            <v-flex xs12>
              <v-text-field
                id="username"
                ref="username"
                v-model="input.username"
                :error="!!error.username"
                :error-messages="error.username"
                name="username"
                label="使用者名稱"
                color="blue"
                @input="error.username = ''"
              />
            </v-flex>
            <v-flex xs12>
              <v-text-field
                id="nickname"
                ref="nickname"
                v-model="input.nickname"
                :error="!!error.nickname"
                :error-messages="error.nickname"
                name="nickname"
                label="暱稱"
                color="blue"
                @input="error.nickname = ''"
              />
            </v-flex>
            <v-flex xs12>
              <v-text-field
                id="phone"
                ref="phone"
                v-model="input.phone"
                :error="!!error.phone"
                :error-messages="error.phone"
                name="phone"
                label="手機號碼"
                color="blue"
                @input="error.phone = ''"
              />
            </v-flex>
            <v-flex xs12>
              <v-text-field
                id="email"
                ref="email"
                v-model="input.email"
                :error="!!error.email"
                :error-messages="error.email"
                name="email"
                label="信箱"
                color="blue"
                @input="error.email = ''"
              />
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="blue"
            flat
            @click="submit"
          >送出</v-btn>
        </v-card-actions>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  middleware: ['checkUserLogin', 'checkUserRegister'],
  data() {
    return {
      input: {
        username: '',
        nickname: '',
        phone: '',
        email: ''
      },
      error: {
        username: '',
        nickname: '',
        phone: '',
        email: ''
      }
    }
  },
  methods: {
    async submit() {
      try {
        Object.keys(this.error).forEach(key => {
          this.error[key] = ''
        })
        await this.$axios.post('/signup', this.input)
        this.$router.replace('/')
      } catch (e) {
        const code = parseInt(e.response && e.response.status)
        if (code === 400) {
          Object.keys(this.error).forEach(key => {
            this.error[key] = e.response.data.error[key]
          })
        } else if (code === 403 && e.response.data.reason === 'registered') {
          this.$nuxt.error({ statusCode: 403, message: 'registered' })
        } else {
          throw e
        }
      }
    }
  }
}
</script>
