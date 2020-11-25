<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-btn
            class="mr-4"
            color="white"
            depressed
            v-for="tab in links.tabs"
            :key="tab.name"
            @click="links.currentTab = tab.name"
        >
          <v-icon dark left>{{tab.icon}}</v-icon>
        {{tab.name}}
        </v-btn>
        <component v-bind:is="currentTabComponent" class="mt-8"></component>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ActiveOrders from '@/components/ActiveOrders'
import OrdersAreComplete from '@/components/OrdersAreComplete'

export default {
  name: "Orders",
  data () {
    return {
      links: {
          currentTab: 'Active',
          tabs: [
              {name: 'Active', icon: 'mdi-apps'},
              {name: 'Complete', icon: 'mdi-check-circle-outline'}
              ]
      },
    }
  },
  computed:{
    currentTabComponent () {
      return 'tab-' + this.links.currentTab.trim().toLowerCase();
    },
  },
  components: {
    'tab-active': ActiveOrders,
    'tab-complete': OrdersAreComplete
  }
}
</script>

<style>
.btn-orders{
  background: aquamarine;
}
</style>