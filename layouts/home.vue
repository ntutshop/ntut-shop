<template>
  <v-app>
    <my-header prominent="true" />
    <v-content>
      <nuxt />
    </v-content>
    <my-footer />
  </v-app>
</template>

<script>
import MyHeader from '../components/public/header/header.vue'
import MyFooter from '../components/public/footer/footer.vue'
export default {
  components: {
    MyHeader,
    MyFooter
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
