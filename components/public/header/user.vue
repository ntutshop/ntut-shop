<template>
  <div class="m-user">
    <template v-if="user">
      <avatar 
        :username="user" 
        size="40"
        color="#FFF"
        background-color="#409eff"/>
    </template>
    <template v-else>
      <el-button 
        type="primary" 
        round
        @click="login">登入</el-button>
    </template>
  </div>
</template>

<script>
import Avatar from 'vue-avatar'
export default {
  components: {
    Avatar
  },
  data() {
    return {
      user: ''
    }
  },
  methods: {
    login() {
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
