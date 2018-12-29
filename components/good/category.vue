<template>
  <div class="m-product-categroy">
    <dl class="classic">
      <dt>分類</dt>
      <dt>全部</dt>
      <div class="list">
        <dd
          v-for="(item,idx) in types"
          :key="idx"
        >
          <iselect
            :name="item.type"
            :list="item.module"
          />
        </dd>
      </div>
    </dl>
  </div>
</template>

<script>
import iselect from './iselect.vue'
export default {
  components: {
    iselect
  },
  props: {
    types: {
      type: Array,
      default () {
        return [
          {
            type: '下拉選單',
            module: ['測試項目', '測試項目']
          },
          {
            type: '下拉選單',
            module: ['測試項目', '測試項目']
          },
          {
            type: '下拉選單',
            module: ['測試項目', '測試項目']
          },
          {
            type: '下拉選單',
            module: ['測試項目', '測試項目']
          },
          {
            type: '下拉選單',
            module: ['測試項目', '測試項目']
          },
          {
            type: '下拉選單',
            module: ['測試項目', '測試項目']
          },
          {
            type: '下拉選單',
            module: ['測試項目', '測試項目']
          },
          {
            type: '下拉選單',
            module: ['測試項目', '測試項目']
          },
          {
            type: '下拉選單',
            module: ['測試項目', '測試項目']
          },
          {
            type: '下拉選單',
            module: ['測試項目', '測試項目']
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss">
.m-product-categroy {
  padding: 20px 30px 0;
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  color: #333;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
}
.classic {
  display: flex;
  > dt {
    width: 80px;
    &:nth-child(2) {
      border-radius: 100px;
      background: #13d1be;
      color: #fff;
      height: 22px;
      line-height: 22px;
      width: 44px;
      box-sizing: border-box;
      margin-right: 40px;
      text-align: center;
    }
  }
  dd {
    display: inline-block;
    margin-right: 40px;
    margin-bottom: 20px;
  }
}
</style>
