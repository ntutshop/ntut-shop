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
            <img :src="avatar">
          </v-avatar>
        </v-layout>
        <v-layout
          justify-center
          class="user-name"
        >
          <h2>{{ userInfo.nickname }}</h2>
        </v-layout>
        <v-layout
          column
          wrap
          justify-center
          align-center
          class="user-rate"
        >
          <span class="rate-value">{{ `${userInfo.rate_average} ${rateComment}` }}</span>
          <el-rate
            v-model="userInfo.rate_average"
            :colors="['#ff9900', '#ff9900', '#FF9900']"
            disabled
          />
        </v-layout>
        <v-layout justify-center>
          <el-button
            round
            plain
            @click="mailto"
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
  async asyncData({ $axios, error, query }) {
    try {
      let { data } = await $axios.get('/user/information', {
        params: query
      })
      return { userInfo: data }
    } catch (e) {
      const code = parseInt(e.response && e.response.status)
      if (code === 401) {
        error({ statusCode: 401 })
      } else if (code === 403 && e.response.data.reason === 'unregistered') {
        error({ statusCode: 403, message: 'unregistered' })
      } else if (code === 404) {
        error({ statusCode: 404, message: '找不到此用戶' })
      } else {
        throw e
      }
    }
  },
  data() {
    return {}
  },
  computed: {
    avatar() {
      if (this.userInfo) {
        if (this.userInfo.authority === 'Facebook') {
          return `https://graph.facebook.com/v3.2/${
            this.userInfo.user_id
          }/picture?type=large`
        }
      }
      return undefined
    },
    rateComment() {
      let rate = this.userInfo.rate_average
      if(rate > 4) {
        return '令人滿意'
      } else if(rate >= 3) {
        return '普通'
      } else {
        return '令人不滿'
      }
    }
  },
  methods: {
    handleSelect(index, indexPath) {},
    mailto() {
      window.open(`mailto:${this.userInfo.email}`, '_blank')
    }
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
  .user-rate {
    color: #838383;
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
