<template>
  <v-app>
    <v-navigation-drawer
        temporary
        app
        v-model="drawer"
    >
      <v-card
          max-width="500"
          class="mx-auto"
      >
        <v-list>
          <v-list-item
              v-for="item in items"
              :key="item.title"
              :to="item.url"
          >
            <v-list-item-icon>
              <v-icon
                  v-if="item.icon"
              >
                {{item.icon}}
              </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item.title" ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
          @click="logout"
          >
            <v-list-item-icon>
              <v-icon
                  v-if="isUserLogIn"
              >
                mdi-exit-to-app
              </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="'Logout'" ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-navigation-drawer>

    <v-app-bar app
               absolute
               color="white"
               elevate-on-scroll
    >

      <v-toolbar-title>
        <router-link to="/" tag="span" class="pointer" >Ad application</router-link>
        <v-divider color="teal accent-2"></v-divider>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-app-bar-nav-icon
          class="hidden-md-and-up mr-sm-n4 mr-xs-10"
          @click="drawer = !drawer"
      >

      </v-app-bar-nav-icon>

      <v-btn depressed
             v-for="item in items"
             :key="item.title"
             :to="item.url"
             color="white"
             class="hidden-sm-and-down">

        <v-icon
            left
        >
          {{item.icon}}
        </v-icon>
        {{item.title}}
      </v-btn>
      <v-btn depressed
              @click="logout"
             color="white"
             class="hidden-sm-and-down"
             v-if="isUserLogIn"
      >
        <v-icon
            left
        >
          mdi-exit-to-app
        </v-icon>
        Logout
      </v-btn>
      <!-- -->
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <v-container>
        <v-subheader id="subheader" color="black" v-if="titlePage">{{titlePage}}</v-subheader>
        <v-divider class="mb-8" color="teal accent-2" v-if="titlePage"></v-divider>

        <router-view></router-view>
      </v-container>
        <v-snackbar
            :value="true"
            color = "black"
            :multi-line="true"
            class="snackbar"
            v-if="getError"
            :timeout="5000"
        >
          {{getError}}
          <template v-slot:action="{ attrs }">
            <v-btn
                color="red"
                text
                v-bind="attrs"
                @click="closeError"
                @input="closeError"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data () {
    return{
      drawer: false,
      titlePage: '',
    }
  },
  computed: {
    getError() {
      return this.$store.getters.error
    },
    isUserLogIn () {
      return this.$store.getters.isUserLogIn
    },
    items () {
      if (this.isUserLogIn) {
         return [
           {title: 'Orders', icon: 'mdi-bookmark-outline', url: '/orders', namePage:'Orders'},
           {title: 'New ad', icon: 'mdi-file-plus', url: '/new', namePage:'New ad'},
           {title: 'My ads', icon: 'mdi-format-list-bulleted', url: '/list', namePage:'My list' }
         ]
      }
      return [
        {title: 'login', icon: 'mdi-lock', url: '/login', namePage: 'Login form'},
        {title: 'Registration', icon: 'mdi-face', url: '/registration', namePage:'Registration form'}
      ]
    },
  },
  methods: {
    getTitle () {
      this.titlePage=''
      const routeName = this.$route.name
      this.items.forEach(item =>{
       const url = item.url.slice(1)
          if (url === routeName){
            this.titlePage = item.namePage
          }
          return this.titlePage
      })
    },
    closeError() {
      this.$store.dispatch('clearError')
    },
    logout () {
      this.$store.dispatch('logoutUser')
      this.$router.push('/')
    }
  },
  beforeMount() {
    this.getTitle()
  },
  beforeUpdate() {
    this.getTitle()
  }
}
</script>

<style>
  .pointer{
    cursor: pointer;
  }
  #subheader{
    font-size: 20px;
    color: black;
  }
  .snackbar{
    opacity: 0.7;
  }
</style>
