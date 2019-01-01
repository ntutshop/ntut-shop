<template>
  <div class="order-item">
    <el-row>
      <el-col
        :span="14"
        class="order-info"
      >
        <dl>
          <dt>
            <img
              :src="meta.imgUrl"
              alt="商品"
            >
          </dt>
          <dd>
            <h3>
              <nuxt-link :to="{path:'detail',query:{keyword:meta.name,type:meta.module}}">{{ meta.name }}</nuxt-link>
            </h3>
            <p>
              <strong class="item-price">＄{{ meta.price }}起</strong>
            </p>
          </dd>
        </dl>
      </el-col>
      <el-col
        :span="6"
        class="order-buyer"
      >
        <div class="buyer-name">
          <span>購買人：</span>
          <span>煨刃</span>
        </div>
        <div class="buyer-shipping">
          <span>運輸方式：</span>
          <span>面交</span>
        </div>
        <div class="buyer-payment">
          <span>付款方式：</span>
          <span>面交</span>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="order-status">
          <div
            v-if="meta.state==='waiting'"
            class="blue--text"
          >等待賣家確認中</div>
          <div
            v-else-if="meta.state==='reject'"
            class="red--text"
          >賣家拒絕交易</div>
          <div
            v-else-if="meta.state==='cancel'"
            class="red--text"
          >買家取消交易</div>
        </div>
      </el-col>
    </el-row>
    <v-divider />
  </div>
</template>

<script>
export default {
  props: {
    meta: {
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
    },
    state: {
      type: String,
      default: ''
    }
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
      // border-bottom: 1px solid #e5e5e5;
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
            border: 1px solid #31bbac;
            background-color: rgb(255, 153, 0);
            border-color: rgb(255, 153, 0);
            color: rgb(255, 255, 255);
            padding: 0 6px;
            border-radius: 2px;
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
          border-top: 1px dashed #ddd;

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
              border-radius: 1px;
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
    min-height: 125px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .order-status {
    min-height: 125px;
    align-items: center;
    display: flex;
  }
}
</style>
