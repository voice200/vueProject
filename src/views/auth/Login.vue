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

            <v-btn
                class="mr-4 btn-orders"
                outlined
                type="submit"
                :loading="loading"
                :disabled="invalid||loading"
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
import {required, min, email} from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

setInteractionMode('eager', )

extend('email', {
  ...email,
  message: 'Email must be valid',
})

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
    email: '',
    password: '',
  }),
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },

  methods: {
    submit () {
      if(this.$refs.observer.validate()) {
        const user = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('loginUser',user)
            .then(() => {
              this.$router.push('/')
            })
            .catch(err => console.log(err))
      }
    },
    clear () {
      this.email= '',
      this.password = ''
      this.$refs.observer.reset()
      this.$store.dispatch('clearError')
    }
  },
  created() {
    if (this.$route.query['loginError']) {
      this.$store.dispatch('setError','Please log in to access this page')
    }
  },
}
</script>

<style scoped>
form {
  margin-right: 12px;
  margin-left: 12px;
}

</style>