<template>
  <div class="m-menu">
    <dl 
      class="menu-list"
      @mouseleave="mouseleave">
      <dt class="menu-title">全部分類</dt>
      <dd 
        v-for="(item, index) in menu"
        :key="index"
        class="menu-item"
        @mouseenter="addSubmenu(item.child)">
        <i 
          :class="item.type" 
          class="item-icon"/>
        <div class="item-title">{{ item.name }}</div>
        <span class="arrow"/>
      </dd>
    </dl>
    <div
      v-if="submenu"
      class="submenu"
      @mouseenter="sin"
      @mouseleave="sout">
      <template
        v-for="(item,idx) in submenu">
        <div 
          :key="idx" 
          class="submenu-container">
          <h4 
            
            class="submenu-title">{{ item.title }}</h4>
          <p
            v-for="v in item.child"
            :key="v"
            class="submenu-content">{{ v }}</p>
        </div>
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
          type: 'fas fa-mobile',
          name: '3C產品',
          child: [
            {
              title: '筆電',
              child: ['Apple', 'ASUS', 'Lenvono', 'Microsoft', 'Dell']
            },
            {
              title: '平板',
              child: ['Apple', 'ASUS', 'SAMSUNG', 'Acer', 'HUAWEI']
            },
            {
              title: '手機',
              child: ['Apple', 'ASUS', '小米', 'HTC', 'SAMSUNG']
            }
          ]
        },
        {
          type: 'fas fa-pencil-alt',
          name: '文具',
          child: [
            {
              title: '通用',
              child: ['工程計算機', '尺', '筆', '白紙', '資料夾', '釘書機']
            },
            {
              title: '電子系',
              child: ['繼電器', '蜂鳴器', '電阻', '電池', '壓線鉗', 'LED']
            },
            {
              title: '工設系',
              child: ['畫筆', '圖紙', '木料']
            }
          ]
        },
        {
          type: 'fas fa-book-open',
          name: '課本',
          child: [
            {
              title: '共同必修',
              child: ['微積分', '物理', '國文']
            },
            {
              title: '電子系',
              child: ['電路學 ', '工程數學', '國文']
            },
            {
              title: '資工系',
              child: [
                '數位邏輯',
                '計算機組織',
                '計算機概論',
                '資料結構',
                '演算法',
                '離散數學'
              ]
            },
            {
              title: '機械系',
              child: ['熱力學', '靜力學', '動力學']
            }
          ]
        },
        {
          type: 'fas fa-book-open',
          name: '課本',
          child: [
            {
              title: '共同必修',
              child: ['微積分', '物理', '國文']
            },
            {
              title: '電子系',
              child: ['電路學 ', '工程數學', '國文']
            },
            {
              title: '資工系',
              child: [
                '數位邏輯',
                '計算機組織',
                '計算機概論',
                '資料結構',
                '演算法',
                '離散數學'
              ]
            },
            {
              title: '機械系',
              child: ['熱力學', '靜力學', '動力學']
            }
          ]
        },
        {
          type: 'fas fa-book-open',
          name: '課本',
          child: [
            {
              title: '共同必修',
              child: ['微積分', '物理', '國文']
            },
            {
              title: '電子系',
              child: ['電路學 ', '工程數學', '國文']
            },
            {
              title: '資工系',
              child: [
                '數位邏輯',
                '計算機組織',
                '計算機概論',
                '資料結構',
                '演算法',
                '離散數學'
              ]
            },
            {
              title: '機械系',
              child: ['熱力學', '靜力學', '動力學']
            }
          ]
        },
        {
          type: 'fas fa-book-open',
          name: '課本',
          child: [
            {
              title: '共同必修',
              child: ['微積分', '物理', '國文']
            },
            {
              title: '電子系',
              child: ['電路學 ', '工程數學', '國文']
            },
            {
              title: '資工系',
              child: [
                '數位邏輯',
                '計算機組織',
                '計算機概論',
                '資料結構',
                '演算法',
                '離散數學'
              ]
            },
            {
              title: '機械系',
              child: ['熱力學', '靜力學', '動力學']
            }
          ]
        },
        {
          type: 'fas fa-book-open',
          name: '課本',
          child: [
            {
              title: '共同必修',
              child: ['微積分', '物理', '國文']
            },
            {
              title: '電子系',
              child: ['電路學 ', '工程數學', '國文']
            },
            {
              title: '資工系',
              child: [
                '數位邏輯',
                '計算機組織',
                '計算機概論',
                '資料結構',
                '演算法',
                '離散數學'
              ]
            },
            {
              title: '機械系',
              child: ['熱力學', '靜力學', '動力學']
            }
          ]
        },
        {
          type: 'fas fa-book-open',
          name: '課本',
          child: [
            {
              title: '共同必修',
              child: ['微積分', '物理', '國文']
            },
            {
              title: '電子系',
              child: ['電路學 ', '工程數學', '國文']
            },
            {
              title: '資工系',
              child: [
                '數位邏輯',
                '計算機組織',
                '計算機概論',
                '資料結構',
                '演算法',
                '離散數學'
              ]
            },
            {
              title: '機械系',
              child: ['熱力學', '靜力學', '動力學']
            }
          ]
        },
        {
          type: 'fas fa-book-open',
          name: '課本',
          child: [
            {
              title: '共同必修',
              child: ['微積分', '物理', '國文']
            },
            {
              title: '電子系',
              child: ['電路學 ', '工程數學', '國文']
            },
            {
              title: '資工系',
              child: [
                '數位邏輯',
                '計算機組織',
                '計算機概論',
                '資料結構',
                '演算法',
                '離散數學'
              ]
            },
            {
              title: '機械系',
              child: ['熱力學', '靜力學', '動力學']
            }
          ]
        },
        {
          type: 'fas fa-book-open',
          name: '課本',
          child: [
            {
              title: '共同必修',
              child: ['微積分', '物理', '國文']
            },
            {
              title: '電子系',
              child: ['電路學 ', '工程數學', '國文']
            },
            {
              title: '資工系',
              child: [
                '數位邏輯',
                '計算機組織',
                '計算機概論',
                '資料結構',
                '演算法',
                '離散數學'
              ]
            },
            {
              title: '機械系',
              child: ['熱力學', '靜力學', '動力學']
            }
          ]
        },
        {
          type: 'fas fa-book-open',
          name: '課本',
          child: [
            {
              title: '共同必修',
              child: ['微積分', '物理', '國文']
            },
            {
              title: '電子系',
              child: ['電路學 ', '工程數學', '國文']
            },
            {
              title: '資工系',
              child: [
                '數位邏輯',
                '計算機組織',
                '計算機概論',
                '資料結構',
                '演算法',
                '離散數學'
              ]
            },
            {
              title: '機械系',
              child: ['熱力學', '靜力學', '動力學']
            }
          ]
        },
        {
          type: 'fas fa-book-open',
          name: '課本',
          child: [
            {
              title: '共同必修',
              child: ['微積分', '物理', '國文']
            },
            {
              title: '電子系',
              child: ['電路學 ', '工程數學', '國文']
            },
            {
              title: '資工系',
              child: [
                '數位邏輯',
                '計算機組織',
                '計算機概論',
                '資料結構',
                '演算法',
                '離散數學'
              ]
            },
            {
              title: '機械系',
              child: ['熱力學', '靜力學', '動力學']
            }
          ]
        },
        {
          type: 'fas fa-book-open',
          name: '課本',
          child: [
            {
              title: '共同必修',
              child: ['微積分', '物理', '國文']
            },
            {
              title: '電子系',
              child: ['電路學 ', '工程數學', '國文']
            },
            {
              title: '資工系',
              child: [
                '數位邏輯',
                '計算機組織',
                '計算機概論',
                '資料結構',
                '演算法',
                '離散數學'
              ]
            },
            {
              title: '機械系',
              child: ['熱力學', '靜力學', '動力學']
            }
          ]
        },
        {
          type: 'fas fa-book-open',
          name: '課本',
          child: [
            {
              title: '共同必修',
              child: ['微積分', '物理', '國文']
            },
            {
              title: '電子系',
              child: ['電路學 ', '工程數學', '國文']
            },
            {
              title: '資工系',
              child: [
                '數位邏輯',
                '計算機組織',
                '計算機概論',
                '資料結構',
                '演算法',
                '離散數學'
              ]
            },
            {
              title: '機械系',
              child: ['熱力學', '靜力學', '動力學']
            }
          ]
        }
      ],
      submenu: ''
    }
  },
  methods: {
    mouseleave() {
      let self = this
      self._timer = setTimeout(function() {
        self.submenu = ''
      }, 150)
    },
    addSubmenu(submenu) {
      this.submenu = submenu
    },
    sin() {
      clearTimeout(this._timer)
    },
    sout() {
      this.submenu = ''
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

  .menu-title {
    font-size: 18px;
    margin: 0 0 24px 0;
    padding: 0 16px;
  }
  .menu-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 4px 16px;
    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
    .item-icon {
      text-align: center;
      height: 16px;
      width: 16px;
      margin-right: 8px;
      color: rgba(255, 255, 255, 0.3);
    }
    .item-title {
      cursor: pointer;
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
  min-height: 463px;
  background-color: #fff;
  z-index: 199;
  color: #666;
  overflow: hidden;
  padding: 0 30px;
  .submenu-title {
    width: 100%;
    margin-top: 24px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e5e5e5;
    font-size: 16px;
    font-weight: 500;
    color: #222;
    cursor: pointer;
    float: left;
  }
  .submenu-content {
    color: #999;
    font-size: 12px;
    line-height: 15px;
    display: inline-block;
    margin-right: 16px;
    margin-top: 10px;
    cursor: pointer;
  }
}
</style>
