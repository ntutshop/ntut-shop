<template>
  <v-hover>
    <v-card
      slot-scope="{ hover }"
      class="mx-auto"
      max-width="600"
    >
      <nuxt-link :to="`/good/${good.id}`">
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/kitchen.png"
          height="180"
        />
        <v-card-text
          class="pt-3"
          style="position: relative;"
        >
          <v-btn
            absolute
            color="orange"
            class="white--text"
            fab
            small
            right
            top
          >
            <v-icon>fas fa-shopping-cart</v-icon>
          </v-btn>
          <h3 class="text-truncate">{{ good.name }}</h3>
          <p class="orange--text">${{ good.price }}</p>
        </v-card-text>
      </nuxt-link>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  props: {
    good: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      image: ''
    }
  },
  async mounted() {
    let vm = this
    let { data } = await vm.$axios.get(`/goods/${good.id}`)
    vm.image = data.images[0]
  }
}
</script>


<style lang="scss">
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
</style>
