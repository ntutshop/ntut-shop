<template>
  <v-hover>
    <v-card
      slot-scope="{ hover }"
      class="mx-auto"
      max-width="600">
      <v-img
        height="180"
        src="https://cdn.vuetifyjs.com/images/cards/kitchen.png"/>
      <v-card-text
        class="pt-3"
        style="position: relative;">
        <v-btn
          absolute
          color="orange"
          class="white--text"
          fab
          small
          right
          top>
          <v-icon>fas fa-shopping-cart</v-icon>
        </v-btn>
        <span class="caption font-weight-light grey--text mb-2">3C</span>
        <h3 class="text-truncate">QW cooking utensildddddd</h3>
        <p class="orange--text">$120 - $300</p>
      </v-card-text>
    </v-card>
  </v-hover>
</template>

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
