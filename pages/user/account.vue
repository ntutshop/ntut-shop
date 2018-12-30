<template>
  <v-container
    fluid
    fill-height
    class="account-container"
  >
    <v-layout
      row
      wrap
      justify-center
    >
      <v-flex xs2>
        <side-bar index="1" />
      </v-flex>
      <v-flex xs10>
        <account />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Account from '@/components/user/account/detail'
import SideBar from '@/components/user/sidebar'
export default {
  components: {
    Account,
    SideBar
  }
}
</script>

<style lang="scss" scoped>
.account-container {
  padding: 32px 24px 32px 0;
}
</style>
