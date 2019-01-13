<template>
  <div class="m-good-list">
    <el-tabs type="border-card">
      <el-tab-pane
        v-for="(item, index) in orderLabel"
        :key="index"
        :label="item.title"
      >
        <good
          v-for="(item, index) in list"
          :key="index"
          :meta="item"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Good from './good.vue'
export default {
  components: {
    Good
  },
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      orderLabel: [
        {
          title: '智能排序'
        },
        {
          title: '價格排序'
        },
        {
          title: '人氣最高'
        },
        {
          title: '評價最高'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.el-tabs {
  box-shadow: none;
}
</style>
