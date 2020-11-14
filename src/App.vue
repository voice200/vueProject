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
                  color="teal accent-2"
              >
                {{item.icon}}
              </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item.title" ></v-list-item-title>
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
      <!-- -->
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <v-container>
        <v-subheader id="subheader" color="black" v-if="titlePage">{{titlePage}}</v-subheader>
        <v-divider class="mb-8" color="teal accent-2" v-if="titlePage"></v-divider>

        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data () {
    return{
      drawer: false,
      items:[
        {title: 'login', icon: 'mdi-lock', url: '/login', namePage: 'Login form'},
        {title: 'Registration', icon: 'mdi-face', url: '/registration', namePage:'Registration form'},
        {title: 'Orders', icon: 'mdi-bookmark-outline', url: '/orders', namePage:'Orders'},
        {title: 'New ad', icon: 'mdi-file-plus', url: '/new', namePage:'New ad'},
        {title: 'My ads', icon: 'mdi-format-list-bulleted', url: '/list', namePage:'My list' }
      ],
      titlePage: ''
    }
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
</style>
