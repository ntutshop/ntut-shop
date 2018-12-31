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
          <el-tab-pane label="待處理">
            <good
              v-for="(item, index) in penddingGoodList"
              :key="index"
              :meta="item"
              :confirm="false"
            />
          </el-tab-pane>
          <el-tab-pane label="處理中">
            <good
              v-for="(item, index) in handlingGoodList"
              :key="index"
              :meta="item"
              pending="true"
            />
          </el-tab-pane>
          <el-tab-pane label="完成">
            <ood
              v-for="(item, index) in finishGoodList"
              :key="index"
              :meta="item"
            />
          </el-tab-pane>
          <el-tab-pane label="取消">
            <good
              v-for="(item, index) in cancelGoodList"
              :key="index"
              :meta="item"
            />
          </el-tab-pane>
        </el-tabs>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import SideBar from '@/components/user/sidebar'
import Good from '@/components/user/good/good'
export default {
  middleware: ['checkUserLogin', 'checkUserRegister'],
  components: {
    SideBar,
    Good
  },
  data() {
    return {
      items: [
        { title: 'Home', icon: 'dashboard' },
        { title: 'About', icon: 'question_answer' }
      ],
      penddingGoodList: [
        {
          name: '雲南菜',
          imgUrl:
            'http://p1.meituan.net/600.600/deal/dd5fb74439b6601228cf0cb4d9275889323455.jpg@220w_125h_1e_1c',
          rate: 5,
          owner: 'Andy Meow',
          price: 238,
          type: '食物'
        },
        {
          name: '雲南菜',
          imgUrl:
            'http://p1.meituan.net/600.600/deal/dd5fb74439b6601228cf0cb4d9275889323455.jpg@220w_125h_1e_1c',
          rate: 5,
          owner: 'Andy Meow',
          price: 238,
          type: '食物'
        }
      ],
      handlingGoodList: [
        {
          name: '雲南菜',
          imgUrl:
            'http://p1.meituan.net/600.600/deal/dd5fb74439b6601228cf0cb4d9275889323455.jpg@220w_125h_1e_1c',
          rate: 5,
          owner: 'Andy Meow',
          price: 238,
          type: '食物'
        },
        {
          name: '雲南菜',
          imgUrl:
            'http://p1.meituan.net/600.600/deal/dd5fb74439b6601228cf0cb4d9275889323455.jpg@220w_125h_1e_1c',
          rate: 5,
          owner: 'Andy Meow',
          price: 238,
          type: '食物'
        }
      ],
      finishGoodList: [
        {
          name: '雲南菜',
          imgUrl:
            'http://p1.meituan.net/600.600/deal/dd5fb74439b6601228cf0cb4d9275889323455.jpg@220w_125h_1e_1c',
          rate: 5,
          owner: 'Andy Meow',
          price: 238,
          type: '食物'
        },
        {
          name: '雲南菜',
          imgUrl:
            'http://p1.meituan.net/600.600/deal/dd5fb74439b6601228cf0cb4d9275889323455.jpg@220w_125h_1e_1c',
          rate: 5,
          owner: 'Andy Meow',
          price: 238,
          type: '食物'
        }
      ],
      cancelGoodList: []
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
