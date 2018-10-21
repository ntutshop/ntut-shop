<template>
  <el-row 
    :gutter="15" 
    class="m-header">
    <el-col :span="4"><department/></el-col>
    <el-col :span="3"><user/></el-col>
    <el-col :span="17"><navbar/></el-col>
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
a {
  color: #999;
}
</style>
