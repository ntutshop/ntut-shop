<template>
  <v-container
    fluid
    fill-height
    class="good-container"
  >
    <v-layout
      row
      wrap
      justify-center
    >
      <v-flex xs2>
        <side-bar index="3" />
      </v-flex>
      <v-flex xs10>
        <el-tabs type="border-card">
          <el-tab-pane label="待處理">待處理</el-tab-pane>
          <el-tab-pane label="處理中">處理中</el-tab-pane>
          <el-tab-pane label="完成">完成</el-tab-pane>
          <el-tab-pane label="取消">取消</el-tab-pane>
        </el-tabs>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import SideBar from '@/components/user/sidebar'

export default {
  components: {
    SideBar
  },
  data() {
    return {
      items: [
        { title: 'Home', icon: 'dashboard' },
        { title: 'About', icon: 'question_answer' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.good-container {
  padding: 32px 24px 32px 0;
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
}
</style>
