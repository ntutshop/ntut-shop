<template>
  <el-menu
    :default-active="index"
    class="menu"
  >
    <el-menu-item index="1">
      <nuxt-link to="/user/account">
        <v-icon size="18">account_circle</v-icon>
        <span slot="title">我的帳戶</span>
      </nuxt-link>
    </el-menu-item>
    <el-menu-item index="2">
      <nuxt-link to="/user/order">
        <v-icon size="18">shopping_basket</v-icon>
        <span slot="title">購買清單</span>
      </nuxt-link>
    </el-menu-item>
    <el-menu-item index="3">
      <nuxt-link to="/user/good">
        <v-icon size="18">store</v-icon>
        <span slot="title">賣家訂單</span>
      </nuxt-link>
    </el-menu-item>
    <el-menu-item index="4">
      <nuxt-link to="/good/publish">
        <v-icon size="18">add_circle_outline</v-icon>
        <span slot="title">上架商品</span>
      </nuxt-link>
    </el-menu-item>
    <el-menu-item index="5">
      <nuxt-link to="/logout">
        <v-icon size="18">exit_to_app</v-icon>
        <span slot="title">登出</span>
      </nuxt-link>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  props: {
    index: {
      type: String,
      default: '1'
    }
  }
}
</script>

<style lang="scss" scoped>
.menu {
  background: none;
  border: none;
  /deep/ * {
    background: none;
  }
  .el-menu-item {
    .v-icon {
      margin-right: 5px;
      vertical-align: middle;
      width: 24px;
      transition: none;
    }
    &:not(.is-active) {
      a > span {
        color: #303133;
      }
    }
    /deep/ a {
      display: inline-block;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
