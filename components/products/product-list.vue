<template>
  <div class="m-products-list">
    <el-tabs type="border-card">
      <el-tab-pane
        v-for="(item, index) in orderLabel"
        :key="index"
        :label="item.title"
      >
        <product
          v-for="(item, index) in productList"
          :key="index"
          :meta="item"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Product from './product.vue'
export default {
  components: {
    Product
  },
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
      ],
      productList: [
        {
          name: '雲南菜',
          imgUrl: 'http://p1.meituan.net/600.600/deal/dd5fb74439b6601228cf0cb4d9275889323455.jpg@220w_125h_1e_1c',
          rate: 5,
          owner: 'Andy Meow',
          price: 238,
          type: '食物'
        },
        {
          name: '雲南菜',
          imgUrl: 'http://p1.meituan.net/600.600/deal/dd5fb74439b6601228cf0cb4d9275889323455.jpg@220w_125h_1e_1c',
          rate: 5,
          owner: 'Andy Meow',
          price: 238,
          type: '食物'
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
