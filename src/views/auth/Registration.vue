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
                name="email"
                rules="required|email"
            >
              <v-text-field
                  v-model="email"
                  :error-messages="errors"
                  label="E-mail"
                  required
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
            <validation-provider
                v-slot="{ errors }"
                name="confirm"
                rules="required|min:6|password:@password"
            >
              <v-text-field
                  type="password"
                  v-model="confirmation"
                  :counter="6"
                  :error-messages="errors"
                  label="Confirm Password"
                  required
              ></v-text-field>
            </validation-provider>

            <v-btn
                class="mr-4"
                type="submit"
                :disabled="invalid"
            >
              Create account
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
import { required, min, email } from 'vee-validate/dist/rules'
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

extend('email', {
  ...email,
  message: 'Email must be valid',
})

extend("password", {
  params: ["target"],
  validate(value, { target }) {
    return value === target;
  },
  message: "Password confirmation does not match",
});


export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    login: '',
    email: '',
    password: '',
    confirmation: ''
  }),

  methods: {
    submit () {
      if(this.$refs.observer.validate()) {
        const user = {
          login: this.login,
          email: this.email,
          password: this.password
        }
        console.log(user)
      }
    },
    clear () {
      this.login = ''
      this.password = ''
      this.email = ''
      this.confirmation = ''
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