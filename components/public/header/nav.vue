<template>
  <div class="m-nav">
    <el-menu
      class="el-menu-demo"
      mode="horizontal">
      <el-submenu index="1">
        <template slot="title">我的訂單</template>
        <el-submenu index="1-1">
          <template slot="title">訂單資訊</template>
          <el-menu-item index="1-1-1">待付款</el-menu-item>
          <el-menu-item index="1-1-2">待出貨</el-menu-item>
          <el-menu-item index="1-1-3">待收貨</el-menu-item>
        </el-submenu>
        <el-menu-item index="1-2">優惠卷</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">我的商家</template>
        <el-menu-item index="2-1">上架商品</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">幫助中心</template>
        <el-menu-item index="3-1">付款方式</el-menu-item>
        <el-menu-item index="3-2">聯繫客服</el-menu-item>
        <el-submenu index="3-3">
          <template slot="title">常見問題</template>
          <el-menu-item index="3-3-1">商城</el-menu-item>
          <el-menu-item index="3-3-2">訂單</el-menu-item>
          <el-menu-item index="3-3-3">寄件物流</el-menu-item>
          <el-menu-item index="3-3-3">退貨退款</el-menu-item>
          <el-menu-item index="3-3-3">賣家相關</el-menu-item>
          <el-menu-item index="3-3-3">帳號安全與其他</el-menu-item>
        </el-submenu>
        <el-menu-item index="3-ˋ">關於北科大學店</el-menu-item>

      </el-submenu>
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
