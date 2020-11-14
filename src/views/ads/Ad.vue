<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-subheader
            class="header mt-n8" >{{title}}</v-subheader>
        <v-divider color="teal accent-2"></v-divider>
        <v-card
            class=" my-12"
            elevation="0"
            max-width="70%"
        >
          <template slot="progress">
            <v-progress-linear
                height="10"
                indeterminate
            ></v-progress-linear>
          </template>

          <v-img
              height="350"
              max-width="100%"
              :src="imageSrc"
          ></v-img>

          <v-card-text class="mb-8">

            <div>{{description}}</div>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                class="btn-orders"
                outlined
                color="black"

            >
              Buy
            </v-btn>
            <v-btn
                color="black"
                text
            >
              Edit
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
name: "Ad",
  data () {
    return {
          title: 'First ad',
          description: 'First descriptionsFirst descriptionsFirst descriptionsFirst descriptionsFirst descriptionsFirst descriptionsFirst descriptionsFirst descriptionsFirst descriptions',
          promo: false,
          imageSrc: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
          id: '123'
    }
  }
}
</script>

<style scoped>
.header{
  color: black;
  font-size: 20px;
}
</style>