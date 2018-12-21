<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ name }}<i class="el-icon-arrow-down el-icon--right" />
    </span>
    <el-dropdown-menu slot="dropdown">

      <el-dropdown-item
        v-for="(item, idx) in list"
        :key="idx"
      >{{ item }}</el-dropdown-item>

    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>
