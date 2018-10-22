<template>
  <div class="m-header">
    <el-row class="topbar">
      <el-col><top-bar/></el-col>
    </el-row>
    <el-row class="searchbar">
      <el-col><search-bar/></el-col>
    </el-row>
  </div>
</template>

<script>
import topBar from './topbar.vue'
import searchBar from './searchbar.vue'
export default {
  components: {
    topBar,
    searchBar
  }
}
</script>

<style lang="scss" scoped>
.m-header {
  flex-direction: column;
  .topbar,
  .searchbar {
    width: 100%;
  }
  .searchbar {
    background: #ffffff;
  }
  .el-col {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
