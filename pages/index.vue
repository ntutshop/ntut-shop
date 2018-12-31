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
    <h2>推薦商品</h2>
    <good-list class="good-list" />
  </div>
</template>

<script>
import Emenu from '@/components/index/menu.vue'
import Banner from '@/components/index/banner.vue'
import GoodList from '@/components/index/good-list.vue'
import HomeHeader from '@/components/index/home-header.vue'

export default {
  components: {
    Emenu,
    Banner,
    GoodList,
    HomeHeader
  },
  layout: 'home'
}
</script>

<style  lang="scss" scoped>
.menu {
  position: relative;
  top: -50px;
}
.banner {
  position: relative;
  top: -7px;
}
/deep/ .good-list {
  margin-top: 16px;
  margin-bottom: 40px;
}
</style>
