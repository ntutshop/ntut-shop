<template>
  <div
    v-if="!isLoading"
    class="order-item"
  >
    <el-row
      type="flex"
      align="middle"
    >
      <el-col
        :span="20"
        class="order-info"
      >
        <dl>
          <dt>
            <img
              :src="good.images[0]"
              alt="商品"
            >
          </dt>
          <dd>
            <h3>
              <nuxt-link :to="{path:`/good/${good.id}`}">{{ good.name }}</nuxt-link>
            </h3>
            <div class="order-buyer">
              <div>
                <span>買家：</span>
                <span>
                  <nuxt-link :to="`/user/info?username=${buyerInfo.username}`">{{ buyerInfo.nickname }}</nuxt-link>
                </span>
              </div>
              <div>
                <span>數量：</span>
                <span>{{ order.good.quantity }}</span>
              </div>
              <div>
                <span>運輸方式：</span>
                <span>{{ order.good.shipping.service }}</span>
              </div>
              <div>
                <span>運輸費用：</span>
                <span>{{ `$${order.good.shipping.fee}` }}</span>
              </div>
              <div>
                <span>付款方式：</span>
                <span>{{ order.good.payment.service }}</span>
              </div>
              <div>
                <span>總計：</span>
                <span>{{ `$${order.good.total}` }}</span>
              </div>
            </div>
          </dd>
        </dl>
      </el-col>
      <el-col
        v-if="!confirm"
        :span="3"
      >
        <div class="check-button">
          <div>
            <v-btn
              outline
              small
              fab
              color="green"
              @click="$emit('accept')"
            >
              <v-icon>check</v-icon>
            </v-btn>
          </div>
          <div>
            <v-btn
              outline
              small
              fab
              color="red"
              @click="$emit('deny')"
            >
              <v-icon>clear</v-icon>
            </v-btn>
          </div>
        </div>
      </el-col>
      <el-col
        v-else-if="pending"
        :span="4"
      >
        <div class="check-button">
          <div>
            <v-btn
              outline
              small
              fab
              color="red"
              @click="$emit('cancel')"
            >
              <v-icon>delete_forever</v-icon>
            </v-btn>
          </div>
        </div>
      </el-col>
      <el-col
        v-else
        :span="4"
      >
        <div class="order-status">
          <div
            v-if="order.state===0"
            class="blue--text"
          >等待賣家確認中</div>
          <div
            v-if="order.state===1"
            class="blue--text"
          >訂單交易中</div>
          <div
            v-if="order.state===2"
            class="green--text"
          >交易完成</div>
          <div
            v-else-if="order.state===3"
            class="red--text"
          >賣家拒絕交易</div>
          <div
            v-else-if="order.state===4"
            class="red--text"
          >買家取消交易</div>
          <div
            v-else-if="order.state===5"
            class="red--text"
          >賣家取消交易</div>
        </div>
      </el-col>
    </el-row>
    <v-divider />
  </div>
</template>

<script>
export default {
  props: {
    order: {
      type: Object,
      default() {
        return {}
      }
    },
    confirm: {
      type: Boolean,
      default: true
    },
    pending: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isLoading: true,
      good: {},
      buyerInfo: {}
    }
  },
  async mounted() {
    this.isLoading = true
    let response = await this.$axios.get(`/goods/${this.order.good.id}`)
    this.good = response.data
    response = await this.$axios.get(
      `/user/information?id=${this.order.buyerId}`
    )
    this.buyerInfo = response.data
    this.isLoading = false
  }
}
</script>

<style lang="scss">
.order-item {
  .order-info {
    dl {
      display: flex;
      min-height: 125px;
      // // padding: 20px 0;
      // bgood-bottom: 1px solid #e5e5e5;
      dt {
        width: 220px;
        height: 125px;

        > img {
          width: 220px;
          height: 125px;
          overflow: hidden;
        }
      }

      dd {
        flex: 1;
        margin-left: 32px;
        padding-top: 4px;
        > h3 {
          font-weight: 500;
          font-size: 16px;
          color: #333;
        }

        .el-rate {
          display: inline-block;

          .el-rate__icon {
            font-size: 12px;
          }
        }

        > span {
          font-size: 12px;
          margin-right: 10px;
        }

        .item-comment-total {
          color: #f90;
        }

        .item-price {
          color: #f60;
        }

        > p {
          margin: 0;
          > span {
            font-size: 12px;
            padding-right: 10px;
          }

          > b {
            float: right;
            bgood: 1px solid #31bbac;
            background-color: rgb(255, 153, 0);
            bgood-color: rgb(255, 153, 0);
            color: rgb(255, 255, 255);
            padding: 0 6px;
            bgood-radius: 2px;
            height: 18px;
            line-height: 18px;
            font-size: 12px;
            cursor: default;
          }
        }

        > ul {
          list-style: none;
          font-size: 12px;
          padding-top: 11px;
          margin-top: 5px;

          li {
            width: 668px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;

            .detail-type {
              width: 27px;
              height: 15px;
              line-height: 15px;
              display: inline-block;
              background: rgb(35, 147, 238);
              color: #fff;
              text-align: center;
              bgood-radius: 1px;
              padding: 1px 2px;
              margin-right: 10px;
            }

            &:nth-child(2) {
              .detail-type {
                background: rgb(162, 35, 204);
              }
            }

            &:nth-child(3) {
              .detail-type {
                background: rgb(234, 109, 45);
              }
            }
          }
        }
      }
    }
  }
  .order-buyer {
    margin-top: 8px;
    div {
      margin-bottom: 8px;
    }
    span:nth-child(1) {
      color: #757575;
      font-size: 14px;
    }
    span:nth-child(2) {
      font-size: 16px;
    }
  }
  .check-button {
    min-height: 132px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
</style>
