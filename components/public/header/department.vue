<template>
  <div class="m-deparment">
    <i class="el-icon-location">資工系</i>
    <nuxt-link 
      class="changeDepartment" 
      to="changeDepartment">
      <el-button 
        type="primary"
        size="mini"
        plain>更換系所</el-button>
    </nuxt-link>
  </div>
</template>

<style lang="scss">
.m-deparment {
  float: left;
  .changeDepartment {
    .el-button {
      padding: 4px 6px;
    }
  }
}
</style>
