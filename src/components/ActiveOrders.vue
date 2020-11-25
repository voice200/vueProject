<template>
  <div>
    <div v-if="ordersNotDone.length === 0">
      <v-container>
        <v-layout row>
          <v-flex class="text-center mt-auto" id="">
            <v-subheader id="noOrders" class="id-flex justify-center"> You have no active orders</v-subheader>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  <v-container v-else-if="!loading">
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
              v-for="(order, index) of ordersNotDone"
              :key="index"
          >
            <v-list-item>
              <template v-slot:default="{active,}">

                <v-list-item-action>
                  <v-checkbox
                      :input-value="active"
                      color="teal accent-3"
                      v-model = "ordersConfirm"
                      :value="order.id"
                  ></v-checkbox>
                </v-list-item-action>

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
                v-if="index < ordersNotDone.length - 1"
                :key="index"
            ></v-divider>
          </v-list-item-group>
        </v-list>
        <div class="d-flex flex-row-reverse">
          <v-btn
              class="ma-2 btn-orders"
              outlined
              @click="markDone()"
              :loading = "loading"
              :disabled="ordersConfirm.length < 1||loading"
          >
            Confirm
          </v-btn>

        </div>
      </v-flex>
    </v-layout>
  </v-container>
  <div v-else>
    <v-container>
      <v-layout row>
        <v-flex class="text-center mt-auto" id="">
          <v-progress-circular
              indeterminate
              color="teal accent-4"
          ></v-progress-circular>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
  </div>
</template>

<script>
export default {
  name: "ActiveOrders",
  data () {
    return {
      ordersConfirm: []
    }
  },
  computed : {
    ordersNotDone () {
      return  this.$store.getters.ordersNotDone
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    markDone () {
      this.$store.dispatch('markDone', this.ordersConfirm)
    },
  },
  created() {
      this.$store.dispatch('fetchOrders')
  }
}
</script>

<style>
#noOrders {
  font-size: 18px;
  color: black;
}
</style>