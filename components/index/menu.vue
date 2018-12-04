<template>
  <div class="m-menu">
    <dl class="menu-list">
      <dt>全部分類</dt>
      <dd 
        v-for="(item, index) in menu"
        :key="index"
        @mouseenter="enter(item.child)">
        <i :class="item.type"/>{{ item.name }}
        <span class="arrow"/>
      </dd>
    </dl>
    <div
      v-if="submenu"
      class="submenu">
      <template
        v-for="(item,idx) in submenu">
        <h4 :key="idx">{{ item.title }}</h4>
        <span
          v-for="v in item.child"
          :key="v">{{ v }}</span>
      </template>
    </div>
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      menu: [
        {
          type: 'fas fa-utensils',
          name: '美食',
          child: [
            {
              title: '美食',
              child: ['代金券', '甜點飲品', '火鍋', '自助餐', '小吃快餐']
            }
          ]
        },
        {
          type: 'fas fa-utensils',
          name: '外賣',
          child: [
            {
              title: '外賣',
              child: ['美團外賣']
            }
          ]
        },
        {
          type: 'fas fa-utensils',
          name: '酒店',
          child: [
            {
              title: '酒店星級',
              child: ['經濟型', '舒適/三星', '高檔/四星', '豪華/五星']
            }
          ]
        },
        {
          type: 'fas fa-utensils',
          name: '酒店',
          child: [
            {
              title: '酒店星級',
              child: ['經濟型', '舒適/三星', '高檔/四星', '豪華/五星']
            }
          ]
        },
        {
          type: 'fas fa-utensils',
          name: '酒店',
          child: [
            {
              title: '酒店星級',
              child: ['經濟型', '舒適/三星', '高檔/四星', '豪華/五星']
            }
          ]
        },
        {
          type: 'fas fa-utensils',
          name: '酒店',
          child: [
            {
              title: '酒店星級',
              child: ['經濟型', '舒適/三星', '高檔/四星', '豪華/五星']
            }
          ]
        },
        {
          type: 'fas fa-utensils',
          name: '酒店',
          child: [
            {
              title: '酒店星級',
              child: ['經濟型', '舒適/三星', '高檔/四星', '豪華/五星']
            }
          ]
        },
        {
          type: 'fas fa-utensils',
          name: '酒店',
          child: [
            {
              title: '酒店星級',
              child: ['經濟型', '舒適/三星', '高檔/四星', '豪華/五星']
            }
          ]
        },
        {
          type: 'fas fa-utensils',
          name: '酒店',
          child: [
            {
              title: '酒店星級',
              child: ['經濟型', '舒適/三星', '高檔/四星', '豪華/五星']
            }
          ]
        },
        {
          type: 'fas fa-utensils',
          name: '酒店',
          child: [
            {
              title: '酒店星級',
              child: ['經濟型', '舒適/三星', '高檔/四星', '豪華/五星']
            }
          ]
        },
        {
          type: 'fas fa-utensils',
          name: '酒店',
          child: [
            {
              title: '酒店星級',
              child: ['經濟型', '舒適/三星', '高檔/四星', '豪華/五星']
            }
          ]
        },
        {
          type: 'fas fa-utensils',
          name: '酒店',
          child: [
            {
              title: '酒店星級',
              child: ['經濟型', '舒適/三星', '高檔/四星', '豪華/五星']
            }
          ]
        },
        {
          type: 'fas fa-utensils',
          name: '酒店',
          child: [
            {
              title: '酒店星級',
              child: ['經濟型', '舒適/三星', '高檔/四星', '豪華/五星']
            }
          ]
        },
        {
          type: 'fas fa-utensils',
          name: '酒店',
          child: [
            {
              title: '酒店星級',
              child: ['經濟型', '舒適/三星', '高檔/四星', '豪華/五星']
            }
          ]
        }
      ],
      submenu: []
    }
  },
  methods: {
    enter(submenu) {
      this.submenu = submenu
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-list {
  background: linear-gradient(
    -180deg,
    rgba(13, 123, 197, 0.85) 2%,
    rgba(69, 148, 201, 0.85) 100%
  );
  color: white;
  padding: 12px 0;
  width: 230px;

  dt {
    font-size: 18px;
    margin: 0 0 24px 0;
    padding: 0 16px;
  }
  dd {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 4px 16px;
    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
    i {
      margin-right: 8px;
      color: rgba(255, 255, 255, 0.3);
    }
    .arrow {
      margin-left: auto;
      width: 4px;
      height: 4px;
      border-bottom: 1px solid #fff;
      border-right: 1px solid #fff;
      transform: rotate(-45deg);
    }
  }
}
.submenu {
  position: absolute;
  top: 60px;
  left: 230px;
  width: 400px;
  height: 433px;
  background-color: #fff;
  z-index: 199;
  color: #666;
  overflow: hidden;
}
</style>
