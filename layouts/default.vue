<template>
  <el-container>
    <el-header><my-header/></el-header>
    <el-main>
      <nuxt />
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>
import MyHeader from '@/components/public/header/index.vue'
export default {
  components: {
    MyHeader
  }
}
</script>


<style lang="scss">
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.el-header {
  background: #f8f8f8;
  color: #999;
  width: 100%;
  height: auto !important;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  .m-header {
    width: 1000px;
    display: flex;
    align-items: center;
    text-align: center;
  }
}
</style>
