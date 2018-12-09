<template>
  <v-layout
    class="m-user">
    <v-flex v-if="user">
      <v-layout
        justify-center>
        <avatar
          :username="user"
          size="40"
          color="#FFF"
          background-color="#409eff"/>
      </v-layout>
    </v-flex>
    <v-flex v-else>
      <v-layout
        justify-end>
        <el-button
          type="primary"
          round
          @click="login">登入</el-button>
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
  data () {
    return {
      user: ''
    }
  },
  methods: {
    login () {
      this.user = '韋辰'
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
