<template>
  <div class="main-container">
    <el-row
      :gutter="24"
      style="width: 1214px;"
      class="banner"
    >
      <el-col :span="19">
        <el-card>
          <el-row>
            <banner />
          </el-row>
        </el-card>
      </el-col>

      <el-col :span="5">
        <el-card style="height: 290px;">
          <div v-if="loggedIn && !!userInfo">
            <v-layout
              row
              wrap
              justify-center
              align-center
              style="margin-top: 24px;"
            >
              <v-avatar size="100">
                <img
                  :src="avatar"
                >
              </v-avatar>
            </v-layout>
            <v-layout
              justify-center
              class="user-name"
            >
              <h2>{{ userInfo.nickname }}</h2>
            </v-layout>
            <v-layout justify-center>
              <el-button
                round
                plain
                @click="$router.push('/user/account')"
              >管理後台</el-button>
            </v-layout>
          </div>
          <div
            v-else-if="loggedIn && !userInfo"
            class="unlogin"
          >
            <h2>請先完成資料填寫</h2>
            <v-btn
              outline
              fab
              large
              color="blue"
            >
              <v-icon>edit</v-icon>
            </v-btn>
          </div>
          <div
            v-else
            class="unlogin"
          >
            <h2>請先登入</h2>
            <v-btn
              outline
              fab
              large
              color="blue"
              @click="login"
            >
              <v-icon>fab fa-facebook-f</v-icon>
            </v-btn>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-card style="margin-bottom: 32px;">
      <h2 class="blue--text font-weight-bold">推薦商品</h2>
      <good-list class="good-list" />
    </el-card>
  </div>
</template>

<script>
import Emenu from '@/components/index/menu.vue'
import Banner from '@/components/index/banner.vue'
import GoodList from '@/components/index/good-list.vue'
import HomeHeader from '@/components/index/home-header.vue'
import { mapState, mapMutations } from 'vuex'
export default {
  components: {
    Emenu,
    Banner,
    GoodList,
    HomeHeader
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
    ...mapState(['loggedIn', 'userInfo'])
  },
  methods: {
    login() {
      if (process.env.NODE_ENV === 'production') {
        /* global FB */
        FB.login(
          async response => {
            try {
              await this.$axios.post('/login', {
                authResponse: response.authResponse
              })
              this.$store.dispatch('updateUserState')
              this.$router.replace('/')
            } catch (e) {
              const code = parseInt(e.response && e.response.status)
              if (code === 401) {
                this.$store.dispatch('updateUserState')
                this.$nuxt.error({ statusCode: 401 })
              } else if (
                code === 403 &&
                e.response.data.reason === 'unregistered'
              ) {
                this.$store.dispatch('updateUserState')
                this.$router.push('/signup')
              } else {
                throw e
              }
            }
          },
          { scope: 'public_profile,email' }
        )
      } else {
        this.showLoginDialog()
      }
    },
    ...mapMutations({
      showLoginDialog: 'showLoginDialog'
    })
  }
}
</script>

<style  lang="scss" scoped>
.banner {
  margin-top: 24px;
  margin-bottom: 24px;
  .user-name {
    margin-top: 16px;
    margin-bottom: 16px;
    > h2 {
      color: #2196f3;
    }
  }
  .unlogin {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > h2 {
      margin-top: 40px;
      font-size: 20px;
      margin-bottom: 24px;
      text-align: center;
      color: #2196f3;
    }
  }
}
/deep/ .good-list {
  margin-top: 16px;
}
</style>
