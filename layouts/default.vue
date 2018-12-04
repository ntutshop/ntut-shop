<template>
  <el-container>
    <el-header><my-header/></el-header>
    <el-main>
      <nuxt />
    </el-main>
    <el-footer><my-footer/></el-footer>
  </el-container>
</template>

<script>
import MyHeader from '../components/public/header/index.vue'
import MyFooter from '../components/public/footer/index.vue'
export default {
  components: {
    MyHeader,
    MyFooter
  }
}
</script>


<style lang="scss">
html,
body {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background-color: #f8f8f8;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.el-header {
  color: #999;
  width: 100%;
  height: auto !important;
  font-size: 12px;
  display: flex;
  padding: 0;
  justify-content: center;
  align-items: center;
  text-align: center;
  .m-header {
    width: 100%;
    display: flex;
    align-items: center;
    text-align: center;
  }
}

.el-footer {
  padding: 0;
}
.el-main {
  position: relative;
  top: -49px;
  padding: 0px;
}
</style>
