<template>
  <div class="m-geo">
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
.changeDepartment {
  .el-button {
    padding: 4px 6px;
  }
}
</style>
