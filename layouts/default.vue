<template>
  <v-app>
    <my-header />
    <v-content>
      <nuxt />
      <login-dialog/>
    </v-content>
    <my-footer />
  </v-app>
</template>

<script>
import MyHeader from '../components/public/header/index.vue'
import MyFooter from '../components/public/footer/index.vue'
import LoginDialog from '@/components/public/login-dialog.vue'
export default {
  components: {
    MyHeader,
    MyFooter,
    LoginDialog
  }
}
</script>

<style lang="scss">
@import '../assets/style/init.scss';
.v-content {
  padding: 0;
  margin: auto;
  width: 1190px !important;
}
</style>
