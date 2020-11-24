<template>
  <v-dialog
      v-model="dialog"
      persistent
      max-width="700"
  >

    <template v-slot:activator="{ on, attrs }">
      <v-btn
          class="btn-orders nr-4"
          outlined
          color="black"
          v-bind="attrs"
          v-on="on"
      >
        BUY
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
                v-model="nameClient"
                :error-messages="errors"
                label="Name"
                required
            ></v-text-field>
          </validation-provider>
          <validation-provider
              v-slot="{ errors }"
              name="description"
              rules="required|min:10"
          >
            <v-text-field
                type="number"
                v-model="phoneClient"
                :error-messages="errors"
                label="Your number phone"
                required
                counter
            ></v-text-field>
          </validation-provider>

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
              class="card-btn"
              outlined
              color="black"
              :loading = "loading"
              :disabled="invalid||loading"
              @click="createOrder"
          >
            BUY
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
      titleModal: `BUY NOW ${this.ad.title}`,
      dialog: false,
      nameClient: '',
      phoneClient: '',

    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading
    }
  },
  methods: {
    createOrder () {
      if(this.$refs.observer.validate()) {
        const order = {
          adId: this.ad.id,
          ownerId: this.ad.ownerId,
          nameClient: this.nameClient,
          phoneClient: this.phoneClient
        }

        this.$store.dispatch('createOrder', order)
            .then(() => {
              this.dialog = false
              this.nameClient =''
              this.phoneClient = ''
              this.$refs.observer.reset()
              this.dialog = false
            })
            .catch((e)=>{
              console.log(e.message)
            })
      }
    },
    noSave () {
      this.dialog = false
      this.nameClient =''
      this.phoneClient = ''
      this.$refs.observer.reset()
    },
  }
}
</script>

<style scoped>

</style>
