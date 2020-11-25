<template>
  <div>
  <div v-if="ordersAreDone.length < 1">
    <v-container>
      <v-layout row>
        <v-flex class="text-center mt-auto" id="">
          <v-subheader id="ordersComplete" class="d-flex justify-center"> You have no completed orders</v-subheader>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
  <v-container v-else>
    <v-layout row>
      <v-flex xs12>
        <v-list
            class="mt-8"
            subheader
            two-line
            flat
        >
          <v-list-item-group
              multiple
              v-for="(order, index) of ordersAreDone"
              :key="index"
          >
            <v-list-item>
              <template>
                <v-list-item-content>
                  <v-list-item-title>{{order.nameClient}}</v-list-item-title>
                  <v-list-item-subtitle>{{order.phoneClient}}</v-list-item-subtitle>
                </v-list-item-content>
                <v-spacer></v-spacer>
                <v-btn text
                       color="teal accent-4"
                       :to="'/ad/' + order.adId"
                       target="_blank"
                >
                  Open
                </v-btn>
              </template>
            </v-list-item>
            <v-divider
                v-if="index < ordersAreDone.length - 1"
                :key="index"
            ></v-divider>
          </v-list-item-group>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
  </div>
</template>

<script>
export default {
  name: "OrdersAreComplete",
  computed : {
    ordersAreDone () {
      return  this.$store.getters.ordersAreDone
    }
  }
}
</script>

<style scoped>
#ordersComplete {
  font-size: 18px;
  color: black;
}
</style>