<template>
  <v-container>
    <v-layout row>
      <v-flex xs12
      >
        <v-list three-line>
          <template v-for="(ad, index) in ads"
          >
            <v-list-item
                :key="ad.id"
            >
              <v-list-item-avatar rounded size="120">
                <v-img  :src="ad.imageSrc"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-html="ad.title"></v-list-item-title>
                <v-list-item-subtitle v-html="ad.description"></v-list-item-subtitle>
              </v-list-item-content>
              <v-spacer></v-spacer>
              <v-btn text
                     color="teal accent-6"
                     :to="'/ad/' + ad.id"
                     target="_blank"
              >
                Open
              </v-btn>
            </v-list-item>
            <v-divider
                :key="index"
            ></v-divider>
          </template>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
name: "AdList",
  data () {
    return {
      header: 'Ad List',
      index: 0,
      ads: [
        {
          title: 'First ad',
          description: 'First description',
          promo: false,
          imageSrc: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
          id: '123',

        },
        {
          title: 'Second ad',
          description: 'First description',
          promo: true,
          imageSrc: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
          id: '1234'
        }
      ]
    }
  }
}
</script>

<style>

</style>