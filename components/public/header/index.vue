<template>
  <div
    :style="style"
    class="header-container"
  >
    <el-row
      class="header-row"
      type="flex"
      align="middle"
      justify="center"
    >
      <el-col :span="5">
        <nuxt-link to="/">
          <v-img
            width="126"
            height="46"
            src="/logo.png"
            alt="Logo"
          />
        </nuxt-link>
      </el-col>
      <el-col
        :span="8"
        class="search"
      >
        <el-autocomplete
          v-model="value"
          :fetch-suggestions="querySearchAsync"
          placeholder="請輸入內容"
          @select="handleSelect"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
          />
        </el-autocomplete>
      </el-col>
      <el-col :span="8">
        <v-layout>
          <navbar />
        </v-layout>
      </el-col>
      <el-col :span="2">
        <cart />
      </el-col>
      <el-col :span="1">
        <user />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Navbar from './nav.vue'
import User from './user.vue'
import Cart from './cart.vue'
export default {
  components: {
    Navbar,
    User,
    Cart
  },
  props: {
    prominent: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      restaurants: [],
      value: '',
      timeout: null
    }
  },
  computed: {
    style () {
      let style = {}
      if (this.prominent) {
        style['height'] = '150px'
        style['padding-bottom'] = '50px'
      }
      return style
    }
  },
  mounted () {
    this.restaurants = this.loadAll()
  },
  methods: {
    loadAll () {
      return [
        { value: 'Apple iPhone XS', address: '長寧區新漁路144號' },
        { value: 'Apple Macbook Pro 2018', address: '長寧區新漁路144號' },
        { value: 'Apple Macbook Air 2016', address: '長寧區新漁路144號' },
        { value: '三全鮮食（北新涇店）', address: '長寧區新漁路144號' },
        {
          value: 'Hot honey 首爾炸雞（仙霞路）',
          address: '上海市長寧區淞虹路661號'
        },
        {
          value: '新旺角茶餐廳',
          address: '上海市普陀區真北路988號創邑金沙谷6號樓113'
        },
        { value: '瀧千家(天山西路店)', address: '天山西路438號' },
        {
          value: '胖仙女紙杯蛋糕（上海凌空店）',
          address: '上海市長寧區金鐘路968號1幢18號樓一層商舖18-101'
        },
        { value: '貢茶', address: '上海市長寧區金鐘路633號' },
        {
          value: '豪大大香雞排超級奶爸',
          address: '上海市嘉定區曹安公路曹安路1685號'
        },
        {
          value: '茶芝蘭（奶茶，手抓餅）',
          address: '上海市普陀區同普路1435號'
        },
        { value: '十二瀧町', address: '上海市北翟路1444弄81號B幢-107' },
        { value: '星移濃縮咖啡', address: '上海市嘉定區新鬱路817號' },
        { value: '阿姨奶茶/豪大大', address: '嘉定區曹安路1611號' },
        { value: '新麥甜四季甜品炸雞', address: '嘉定區曹安公路2383弄55號' },
        {
          value: 'Monica摩托主題咖啡店',
          address: '嘉定區江橋鎮曹安公路2409號1F，2383弄62號1F'
        },
        {
          value: '浮生若茶（凌空soho店）',
          address: '上海長寧區金鐘路968號9號樓地下一層'
        },
        {
          value: 'NONO JUICE 鮮榨果汁',
          address: '上海市長寧區天山西路119號'
        },
        { value: 'CoCo都可(北新涇店）', address: '上海市長寧區仙霞西路' },
        {
          value: '快樂檸檬（神州智慧店）',
          address: '上海市長寧區天山西路567號1層R117號店鋪'
        },
        {
          value: 'Merci Paul cafe',
          address: '上海市普陀區光復西路丹巴路28弄6號樓819'
        },
        {
          value: '貓山王（西郊百聯店）',
          address: '上海市長寧區仙霞西路88號第一層G05-F01-1-306'
        },
        { value: '槍會山', address: '上海市普陀區棕櫚路' },
        { value: '縱食', address: '元豐天山花園(東門) 雙流路267號' },
        { value: '錢記', address: '上海市長寧區天山西路' },
        { value: '壹杯加', address: '上海市長寧區通協路' },
        {
          value: '唦哇嘀咖',
          address: '上海市長寧區新涇鎮金鐘路999號2幢（B幢）第01層第1-02A單元'
        },
        { value: '愛茜茜裡(西郊百聯)', address: '長寧區仙霞西路88號1305室' },
        {
          value: '愛茜茜裡(近鐵廣場)',
          address:
            '上海市普陀區真北路818號近鐵城市廣場北區地下二樓N-B2-O2-C商舖'
        },
        {
          value: '鮮果榨汁（金沙江路和美廣店）',
          address: '普陀區金沙江路2239號金沙和美廣場B1-10-6'
        },
        {
          value: '開心麗果（繽谷店）',
          address: '上海市長寧區威寧路天山路341號'
        },
        { value: '超級雞車（豐莊路店）', address: '上海市嘉定區豐莊路240號' },
        { value: '妙生活果園（北新涇店）', address: '長寧區新漁路144號' },
        { value: '香宜度麻辣香鍋', address: '長寧區淞虹路148號' },
        {
          value: '凡仔漢堡（老真北路店）',
          address: '上海市普陀區老真北路160號'
        },
        { value: '港式小舖', address: '上海市長寧區金鐘路968號15樓15-105室' },
        { value: '蜀香源麻辣香鍋（劍河路店）', address: '劍河路443-1' },
        { value: '北京餃子館', address: '長寧區北新涇街道天山西路490-1號' },
        {
          value: '飯典*新簡餐（凌空SOHO店）',
          address: '上海市長寧區金鐘路968號9號樓地下一層9-83室'
        },
        {
          value: '焦耳·川式快餐（金鐘路店）',
          address: '上海市金鐘路633號地下一層甲部'
        },
        { value: '動力雞車', address: '長寧區仙霞西路299弄3號101B' },
        { value: '瀏陽蒸菜', address: '天山西路430號' },
        { value: '四海遊龍（天山西路店）', address: '上海市長寧區天山西路' },
        {
          value: '櫻花食堂（凌空店）',
          address: '上海市長寧區金鐘路968號15樓15-105室'
        },
        { value: '壹分米客家傳統調製米粉(天山店)', address: '天山西路428號' },
        {
          value: '福榮祥燒臘（平溪路店）',
          address: '上海市長寧區協和路福泉路255弄57-73號'
        },
        {
          value: '速記黃燜雞米飯',
          address: '上海市長寧區北新涇街道金鐘路180號1層01號攤位'
        },
        { value: '紅辣椒麻辣燙', address: '上海市長寧區天山西路492號' },
        {
          value: '(小楊生煎)西郊百聯餐廳',
          address: '長寧區仙霞西路88號百聯2樓'
        },
        { value: '陽陽麻辣燙', address: '天山西路389號' },
        {
          value: '南拳媽媽龍蝦蓋澆飯',
          address: '普陀區金沙江路1699號鑫樂惠美食廣場A13'
        }
      ]
    },
    querySearchAsync (queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 3000 * Math.random())
    },
    createStateFilter (queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    },
    handleSelect (item) {
      console.log(item)
    }
  }
}
</script>

<style lang="scss">
.v-btn {
  box-shadow: none !important;
}
.header-container {
  height: 100px;
  display: block;
  background-color: white;
  box-shadow: 0 2px 27px 0 rgba(0, 0, 0, 0.1);
  .header-row {
    width: 1190px;
    margin: 20px auto;
  }
  .el-autocomplete {
    width: 335px;
    .el-input-group__append {
      background-color: #2196f3;
      border: 0;
      color: white;
    }
  }
}
</style>
