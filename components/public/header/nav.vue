<template>
  <div class="m-nav">
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
    >
      <el-menu-item index="1">
        <nuxt-link
          to="/user/order/buyer"
          style="display: block;"
        >我的訂單</nuxt-link>
      </el-menu-item>
      <el-menu-item index="2">
        <nuxt-link
          to="/user/order/seller"
          style="display: block;"
        >我的賣場</nuxt-link>
      </el-menu-item>
      <el-menu-item index="3">
        <nuxt-link
          to="/good/publish"
          style="display: block;"
        >上架商品</nuxt-link>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style lang="scss">
.m-nav {
  display: flex;
  justify-content: flex-end;
  .el-menu {
    font-size: 12px !important;
    border-bottom: none;
    * {
      font-size: 12px !important;
    }
  }
}
</style>
