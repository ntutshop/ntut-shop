<template>
  <div class="home-good-list">
    <v-layout justify-center>
      <v-flex xs12>
        <v-container
          fluid
          grid-list-md
          class="pa-0"
        >
          <v-layout
            row
            wrap
          >
            <v-flex
              v-for="(good, index) in goodList.slice(80,200)"
              :key="index"
              xs2
            >
              <good :good="good" />
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Good from './good.vue'
export default {
  components: {
    Good
  },
  data() {
    return {
      goodList: []
    }
  },
  async mounted() {
    let vm = this
    let { data } = await vm.$axios.get('/goods')
    // console.log(data)
    vm.goodList = data
  }
}
</script>
