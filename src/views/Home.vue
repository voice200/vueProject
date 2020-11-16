<template>
  <div>
    <v-container fluid>
      <v-layout row>
        <v-flex xs12>
            <v-carousel class="carousel">
              <v-carousel-item
                  v-for="ad in promoAds"
                  :key="ad.id"
                  :src="ad.imageSrc"
                  reverse-transition="fade-transition"
                  transition="fade-transition"
                  cycle
                  interval="2000"
                  :to="'/ad/' + ad.id"
                  class="carousel-slider"
              >
              </v-carousel-item>
            </v-carousel>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container>
      <v-layout row>
        <v-flex
                v-for="ad in ads"
                :key="ad.id"
        >
          <v-card
              class=" my-12"
              max-width="374"
          >
            <template slot="progress">
              <v-progress-linear
                  height="10"
                  indeterminate
              ></v-progress-linear>
            </template>

            <v-img
                height="250"
                :src="ad.imageSrc"
            ></v-img>

            <v-card-title>{{ad.title}}</v-card-title>

            <v-card-text>

              <div>{{ad.description}}</div>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  class="card-btn"
                  outlined
                  color="black"
                  text
              >
                Buy
              </v-btn>
              <v-btn
                  color="black"
                  text
                  :to="'/ad/' + ad.id"
              >
                Open
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>

</template>

<script>
export default {
  name: "Home",
  computed: {
    promoAds (){
        return this.$store.getters.promoAds
    },
    ads () {
        return this.$store.getters.ads
    }
  }
}
</script>

<style scoped>
.card-btn{
  background: aquamarine;
}
.carousel-slider{
  cursor: pointer;
}
</style>