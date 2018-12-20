<template>
  <div class="main-container">
    <el-row style="width: 1190px;">
      <el-col :span="5">
        <emenu class="menu" />
      </el-col>
      <el-col :span="19">
        <el-row>
          <home-header class="home-header" />
        </el-row>
        <el-row>
          <banner class="banner" />
        </el-row>
      </el-col>
    </el-row>
    <product-suggest />
  </div>
</template>

<script>
import Emenu from '../components/index/menu.vue'
import Banner from '../components/index/banner.vue'
import ProductSuggest from '../components/index/product_suggest.vue'
import HomeHeader from '../components/index/home_header.vue'

export default {
  components: {
    Emenu,
    Banner,
    ProductSuggest,
    HomeHeader
  },
  layout: 'home'
}
</script>

<style  lang="scss">
.menu {
  position: relative;
  top: -50px;
}
.home-header {
  position: relative;
  top: -38px;
  a {
    color: #222;
    font-weight: 700;
    font-size: 16px;
    margin: 0 20px;
    cursor: pointer;
    position: relative;
  }
}
.banner {
  position: relative;
  top: -7px;
}
</style>
