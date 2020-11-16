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
      index: 0,
    }
  },
  computed: {
    ads () {
      return this.$store.getters.myAds
    }
  }
}
</script>

<style>

</style>