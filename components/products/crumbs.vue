<template>
  <div class="m-crumbs">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/' }">北科二手</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">{{ category }}</a></el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  props: {
    keyword: {
      type: String,
      default: ''
    },
    category: {
      type: String,
      default: ''
    }
  }
}
</script>
