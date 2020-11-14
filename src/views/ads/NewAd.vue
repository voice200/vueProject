<template>
  <v-container>
    <v-layout row>
      <v-flex md6>
        <validation-observer
            ref="observer"
            v-slot="{ invalid }"
        >
          <form @submit.prevent="submit" class="ml-sm-4 mr-sm-4 mr-xs-4"
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
                  type="password"
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
                type="submit"
                :disabled="invalid"
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
    <v-layout row>
      <v-flex md6>
        <img :src="img" alt="img" v-if="img" style="height: 200px">
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
    img: ''
  }),

  methods: {
    submit () {
      if(this.$refs.observer.validate()) {
        const ad = {
          title: this.title,
          description: this.description,
          promo: this.promo,
          img: this.img
        }
        console.log(ad)
      }
    },
    clear () {
      this.title = ''
      this.description = ''
      this.promo = false
      this.img = ''
      this.$refs.observer.reset()
    },
  }
}
</script>

<style scoped>
form {
  margin-right: 12px;
  margin-left: 12px;
}

</style>