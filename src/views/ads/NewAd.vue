<template>
  <v-container>
    <v-layout row>
      <v-flex md6>
        <validation-observer
            ref="observer"
            v-slot="{ invalid }"
        >
          <form @submit.prevent class="ml-sm-4 mr-sm-4 mr-xs-4"
          >
            <validation-provider
                v-slot="{ errors }"
                name="Login"
                rules="required|min:3"
            >
              <v-text-field
                  v-model="title"
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
                  v-model="description"
                  :error-messages="errors"
                  label="Description"
                  required
              ></v-text-field>
            </validation-provider>
            <validation-provider
                v-slot="{ errors }"
                name="image"
                rules="required"
            >
              <v-file-input
                  :error-messages="errors"
                  v-model="img"
                  counter
                  show-size
                  truncate-length="13"
                  color="teal accent-4"
                  accept="image/*"
                  @change="onFileChange"
              ></v-file-input>
            </validation-provider>
            <v-switch
                v-model="promo"
                label="Add in promo?"
                color="teal accent-4"
            ></v-switch>
            <v-btn
                class="mr-4 btn-orders"
                outlined
                :loading = "loading"
                :disabled="invalid||loading"
                @click="createAd"
            >
              Add new ad
            </v-btn>
            <v-btn @click="clear">
              clear
            </v-btn>
          </form>
        </validation-observer>
      </v-flex>
    </v-layout>
    <v-layout row class="mt-6">
      <v-flex md6>
        <img :src="imgSrc" alt="img" v-if="imgSrc" style="height: 200px">
      </v-flex>
    </v-layout>
  </v-container>
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
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    title: '',
    description: '',
    promo: false,
    imgSrc: '',
    img:null
  }),
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    createAd () {
      if(this.$refs.observer.validate() && this.img) {
        const ad = {
          title: this.title,
          description: this.description,
          promo: this.promo,
          image: this.img
        }

        this.$store.dispatch('createAd', ad)
            .then(() => {
                this.$router.push('/list')
            })
            .catch(()=>{})
      }
    },
    clear () {
      this.title = ''
      this.description = ''
      this.promo = false
      this.img = null
      this.$refs.observer.reset()
    },
    onFileChange () {
        if (!this.img){
          this.imgSrc = ''
        } else {
          const reader = new FileReader()
          reader.readAsDataURL(this.img)
          reader.onload = () =>{
            this.imgSrc = reader.result
          }
        }
    }
  }
}
</script>

<style scoped>
form {
  margin-right: 12px;
  margin-left: 12px;
}

</style>