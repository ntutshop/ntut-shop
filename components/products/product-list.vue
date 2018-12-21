<template>
  <div class="m-products-list">
    <el-tabs type="border-card">
      <el-tab-pane
        v-for="(item, index) in productList"
        :key="index"
        :label="item.title"
      >
        <div>{{ item.title }}</div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// import Item from '../product.vue'
export default {
  components: {},
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      productList: [
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
  },
  async asyncData ({ app }) {
    let { data } = await app.$axios.get('searchList')
    return { items: data.list }
  },
  methods: {
    navSelect: function () {
      console.log('select')
    }
  }
}
</script>

<style lang="scss">
.el-tabs {
  box-shadow: none;
}
</style>
