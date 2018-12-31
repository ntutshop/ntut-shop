<template>
  <v-container
    fluid
    fill-height
  >
    <v-layout
      row
      wrap
      justify-center
      align-center
    >
      <v-card
        style="width: 100%;"
        class="user-info"
      >
        <v-layout
          row
          wrap
          justify-center
          align-center
        >
          <v-avatar size="100">
            <img
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="John"
            >
          </v-avatar>
        </v-layout>
        <v-layout
          justify-center
          class="user-name"
        >
          <h2>陳威威</h2>
        </v-layout>
        <v-layout
          justify-center
          class="user-department"
        >
          <p>國立臺北科技大學 資訊工程學系</p>
        </v-layout>
        <v-layout justify-center>
          <el-button
            round
            plain
          >聯絡他</el-button>
        </v-layout>
        <el-menu
          default-active="2"
          class="user-menu"
          mode="horizontal"
          style="display: flex;justify-content: center;"
          @select="handleSelect"
        >
          <el-menu-item index="1">所有商品</el-menu-item>
          <el-menu-item index="2">上架商品</el-menu-item>
          <el-menu-item index="3">售完商品</el-menu-item>
          <el-menu-item index="4">下架商品</el-menu-item>
        </el-menu>
        <good-list class="good-list" />
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import GoodList from '@/components/index/good-list'
export default {
  components: {
    GoodList
  },
  asyncData({ params }) {
    return params
  },
  data() {
    return {}
  },
  methods: {
    handleSelect(index, indexPath) {}
  }
}
</script>

<style lang="scss" scoped>
.user-info {
  padding: 32px;
  .user-name {
    > h2 {
      color: #2196f3;
      font-size: 24px;
      margin-top: 15px;
      font-weight: 700;
    }
  }
  .user-department {
    color: #999;
    margin-bottom: 8px;
  }
  .user-menu {
    margin-top: 16px;
  }
  .good-list {
    margin-top: 24px;
  }
}
</style>
