<template>
  <div class="container">
    <el-row>
      <el-col :span="5"><emenu/></el-col>
      <el-col :span="19"><banner/></el-col>
    </el-row>
  </div>
</template>

<script>
import Emenu from '../components/index/menu.vue'
import Banner from '../components/index/banner.vue'

export default {
  components: {
    Emenu,
    Banner
  }
}
</script>

<style  lang="scss">
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
