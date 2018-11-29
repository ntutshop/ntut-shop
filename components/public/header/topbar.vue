<template>
  <el-row 
    :gutter="0" 
    class="m-topbar">
    <el-col :span="3"><department/></el-col>
    <el-col :span="3"><user/></el-col>
    <el-col 
      :span="18" >
      <el-row
        style="width: 100%;"
        type="flex"
        justify="end"
        align="right">
        <navbar/>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import Department from './department.vue'
import User from './user.vue'
import Navbar from './nav.vue'
export default {
  components: {
    Department,
    User,
    Navbar
  }
}
</script>

<style lang="scss">
.m-topbar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  @media screen and (max-width: 1200px) {
    width: 992px;
  }
  width: 1190px;
}
a {
  color: #999;
}
</style>
