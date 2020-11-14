<template>
  <v-container>
    <v-layout row>
      <v-flex md6>
<!--        <v-subheader-->
<!--            class="subheader">Login form</v-subheader>-->
<!--        <v-divider></v-divider>-->
        <validation-observer
            ref="observer"
            v-slot="{ invalid }"
        >
          <form @submit.prevent="submit" class="ml-sm-4 mr-sm-4 mr-xs-4"
          >
            <validation-provider
                v-slot="{ errors }"
                name="Login"
                rules="required|min:6"
            >
              <v-text-field
                  v-model="login"
                  :error-messages="errors"
                  label="Login"
                  required
                  :counter="6"
              ></v-text-field>
            </validation-provider>
            <validation-provider
                v-slot="{ errors }"
                name="password"
                rules="required|min:6"
            >
              <v-text-field
                  type="password"
                  v-model="password"
                  :counter="6"
                  :error-messages="errors"
                  label="Password"
                  required
              ></v-text-field>
            </validation-provider>

            <v-btn
                class="mr-4 btn-orders"
                outlined
                type="submit"
                :disabled="invalid"
            >
              login
            </v-btn>
            <v-btn @click="clear">
              clear
            </v-btn>
          </form>
        </validation-observer>
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
    login: '',
    password: '',
  }),

  methods: {
    submit () {
      if(this.$refs.observer.validate()) {
        const user = {
          login: this.login,
          password: this.password
        }
        console.log(user)
      }
    },
    clear () {
      this.login = ''
      this.password = ''
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