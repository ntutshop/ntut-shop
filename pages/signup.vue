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
                name="username"
                label="使用者名稱"
                color="blue"
              />
            </v-flex>
            <v-flex xs12>
              <v-text-field
                id="nickname"
                ref="nickname"
                v-model="input.nickname"
                name="nickname"
                label="暱稱"
                color="blue"
              />
            </v-flex>
            <v-flex xs12>
              <v-text-field
                id="phone"
                ref="phone"
                v-model="input.phone"
                name="phone"
                label="手機號碼"
                color="blue"
              />
            </v-flex>
            <v-flex xs12>
              <v-text-field
                id="email"
                ref="email"
                v-model="input.email"
                name="email"
                label="信箱"
                color="blue"
              />
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            color="blue"
            flat>送出</v-btn>
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
      }
    }
  }
}
</script>
