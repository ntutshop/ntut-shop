<template>
  <dl class="good-item">
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
      <el-rate
        v-model="meta.rate"
        :colors="['#ff9900', '#ff9900', '#FF9900']"
        disabled
      />
      <span
        v-if="meta.rate>4"
        class="item-comment"
      >很好</span><span
        v-else-if="meta.rate>3"
        class="item-comment"
      >一般</span><span
        v-else
        class="item-comment"
      >很差</span>
      <span class="item-value">{{ meta.rate }}分</span>
      <p>
        <span class="item-type">{{ meta.type }}</span>
      </p>
      <p>
        <strong class="item-price">＄{{ meta.price }}起</strong>
      </p>
    </dd>
  </dl>
</template>

<script>
export default {
  props: {
    meta: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style lang="scss">
.good-item {
  display: flex;
  padding: 20px 0;
  min-height: 125px;
  border-bottom: 1px solid #e5e5e5;

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
</style>
