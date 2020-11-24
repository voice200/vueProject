<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-list
            subheader
            two-line
            flat
        >
          <v-list-item-group
              multiple
              v-for="(order, index) of orders"
              :key="order.id"
          >
            <v-list-item>
              <template v-slot:default="{active,}">

                <v-list-item-action>
                  <v-checkbox
                      :input-value="active"
                      color="teal accent-3"
                      @change="markDone(order)"
                  ></v-checkbox>
                </v-list-item-action>

                <v-list-item-content>
                  <v-list-item-title>{{order.name}}</v-list-item-title>
                  <v-list-item-subtitle>{{order.phone}}</v-list-item-subtitle>
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
                v-if="index < orders.length - 1"
                :key="index"
            ></v-divider>
          </v-list-item-group>
        </v-list>
        <div class="d-flex flex-row-reverse">
          <v-btn
              class="ma-2 btn-orders"
              outlined
              @click="ordersActive"
          >
            Confirm
          </v-btn>

        </div>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Orders",
  data () {
    return {
      index: 0,
      orders: [
        {
          id: 'fds3',
          name: 'Irina',
          phone: '8-921-121-12-12',
          adId: '123',
          done: false
        },
        {
          id: 'fds3dd',
          name: 'Динара',
          phone: '8-921-121-12-12',
          adId: '123',
          done: false
        }
      ]
    }
  },
  methods: {
    markDone (order) {
      order.done = true
    },
    ordersActive() {
      const ordersDone = []
      this.orders.forEach(order =>{
        if (order.done) {
          ordersDone.push(order)
        }
        return ordersDone
      })
      console.log(ordersDone);
    }
  }
}
</script>

<style>
.btn-orders{
  background: aquamarine;
}
</style>