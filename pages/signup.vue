<template>
  <v-container>
    <v-layout
      row
      wrap
      justify-center
    >
      <v-card
        width="500"
        class="pa-4">
        <v-card-title
          class="headline"
          primary-title>
          完成個人資訊填寫
        </v-card-title>
        <v-card-text>
          <v-layout
            row
            wrap>
            <v-flex xs12>
              <v-text-field
                id="username"
                ref="username"
                v-model="input.username"
                :error="error.username"
                name="username"
                label="使用者名稱"
                color="blue"
                @input="error.username = false"
              />
            </v-flex>
            <v-flex xs12>
              <v-text-field
                id="nickname"
                ref="nickname"
                v-model="input.nickname"
                :error="error.nickname"
                name="nickname"
                label="暱稱"
                color="blue"
                @input="error.nickname = false"
              />
            </v-flex>
            <v-flex xs12>
              <v-text-field
                id="phone"
                ref="phone"
                v-model="input.phone"
                :error="error.phone"
                name="phone"
                label="手機號碼"
                color="blue"
                @input="error.phone = false"
              />
            </v-flex>
            <v-flex xs12>
              <v-text-field
                id="email"
                ref="email"
                v-model="input.email"
                :error="error.email"
                name="email"
                label="信箱"
                color="blue"
                @input="error.email = false"
              />
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            color="blue"
            flat
            @click="submit">送出</v-btn>
        </v-card-actions>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      input: {
        username: '',
        nickname: '',
        phone: '',
        email: ''
      },
      error: {
        username: false,
        nickname: false,
        phone: false,
        email: false
      }
    }
  },
  methods: {
    async submit () {
      let { data } = await this.$axios.post('/api/signup', this.input)
      if (data.success) {
        this.$router.replace('/')
      } else {
        if (data.type === 'body') {
          data.path.forEach((p) => {
            this.error[p] = true
          })
        } else {
          this.$router.replace('/')
        }
      }
    }
  }
}
</script>
