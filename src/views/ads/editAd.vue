<template>
    <v-dialog
        v-model="dialog"
        persistent
        max-width="700"
    >

      <template v-slot:activator="{ on, attrs }">
        <v-btn
            color="black"
            text
            v-bind="attrs"
            v-on="on"
        >
          Edit
        </v-btn>
      </template>
      <validation-observer
          ref="observer"
          v-slot="{ invalid }"
      >
      <v-card>
        <v-card-title class="headline">
              {{titleModal}}
        </v-card-title>
        <v-card-text>
          <validation-provider
              v-slot="{ errors }"
              name="Login"
              rules="required|min:3"
          >
            <v-text-field
                v-model="titleEdit"
                :error-messages="errors"
                label="Title"
                required
            ></v-text-field>
          </validation-provider>
          <validation-provider
              v-slot="{ errors }"
              name="description"
              rules="required|min:3"
          >
            <v-text-field
                type="text"
                v-model="descriptionEdit"
                :error-messages="errors"
                label="Description"
                required
            ></v-text-field>
          </validation-provider>
            <v-file-input
                v-model="imageEdit"
                counter
                show-size
                truncate-length="13"
                color="teal accent-4"
                accept="image/*"
                @change="onFileChange"
            ></v-file-input>

          <v-switch
              v-model="promoEdit"
              label="Add in promo?"
              color="teal accent-4"
          ></v-switch>
          <v-layout row class="mt-6">
            <v-flex md6>
              <img :src="imageSrcEdit" alt="img" v-if="imageSrcEdit" style="height: 200px">
            </v-flex>
          </v-layout>

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="green darken-1"
              text
              @click="noSave"
          >
            Сlose
          </v-btn>
          <v-btn
              color="green darken-1"
              text
              :loading = "loading"
              :disabled="invalid||loading"
              @click="updateAd"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
      </validation-observer>
    </v-dialog>
</template>

<script>
import { required, min } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} can not be empty',
})

extend('min', {
  ...min,
  message: '{_field_} may not be less than {length} characters',
})

export default {
  name: "editAd",
  props: ['ad'],
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      titleModal: 'Edit ad',
      dialog: false,
      titleEdit: this.ad.title,
      descriptionEdit: this.ad.description,
      promoEdit: this.ad.promo,
      imageSrcEdit: this.ad.imageSrc,
      imageEdit: null
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading
    }
  },
  methods: {
    updateAd () {

      if(this.$refs.observer.validate()) {
        let ad
        if (this.imageEdit){
          console.log('картинка другая')
          ad = {
            title: this.titleEdit,
            description: this.descriptionEdit,
            promo: this.promoEdit,
            id: this.ad.id,
            image: this.imageEdit,
            // imageSrc: this.ad.imageSrc
          }
        } else {
           ad = {
            title: this.titleEdit,
            description: this.descriptionEdit,
            promo: this.promoEdit,
            id: this.ad.id,
            imageSrc: this.ad.imageSrc
          }
        }
        this.$store.dispatch('updateAd', ad)
            .then(() => {
             // location.reload()
              this.dialog = false
            })
            .catch((e)=>{
              console.log(e.message)
            })
      }
    },
    noSave () {
      this.dialog = false
      this.titleEdit = this.ad.title
      this.descriptionEdit = this.ad.description
      this.promoEdit = this.ad.promo
      this.imageSrcEdit = this.ad.imageSrc
      this.imageEdit =  this.ad.image
      this.$refs.observer.reset()
    },
    onFileChange () { //менять картинку
      if (!this.imageEdit){
        this.imageSrcEdit = ''
      } else {
        const reader = new FileReader()
        reader.readAsDataURL(this.imageEdit)
        reader.onload = () =>{
          this.imageSrcEdit = reader.result
        }
      }
    }
  }
}
</script>

<style scoped>

</style>