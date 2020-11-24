<template>
  <v-container v-if="!loading">
    <v-layout row>
      <v-flex xs12>
        <v-subheader
            class="header mt-n8" >{{ad.title}}</v-subheader>
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
              :src="ad.imageSrc"
          ></v-img>

          <v-card-text class="mb-8">

            <div>{{ad.description}}</div>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <app-buy-modal :ad="ad"></app-buy-modal>
            <add-edit-ad-modal :ad="ad" v-if="isOwnerAd"></add-edit-ad-modal>
          </v-card-actions>
        </v-card>
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
</template>

<script>
import editAd from './editAd'

export default {
name: "Ad",
  props: ['id'],
  computed: {
    ad () {
      const id = this.id
      return this.$store.getters.adById(id)
    },
    loading () {
      return this.$store.getters.loading
    },
    isOwnerAd() {
      return this.ad.ownerId === this.$store.getters.getUser.id
    }
  },
  components: {
    addEditAdModal: editAd
  }
}
</script>

<style scoped>
.header{
  color: black;
  font-size: 20px;
}
</style>