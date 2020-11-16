import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/auth/Login";
import Registration from "@/views/auth/Registration";
import Ad from "@/views/ads/Ad";
import NewAd from "@/views/ads/NewAd";
import AdList from "@/views/ads/AdList";
import Orders from "@/views/user/Orders";
import Home from "@/views/Home";
import NotFoundComponent from "@/views/NotFoundComponent";

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/registration',
    name: 'registration',
    component: Registration
  },
  {
    path: '/ad/:id',
    props: true,
    name: 'ad',
    component: Ad
  },
  {
    path: '/new',
    name: 'new',
    component: NewAd
  },
  {
    path: '/orders',
    name: 'orders',
    component: Orders
  },
  {
    path: '/list',
    name: 'list',
    component: AdList
  },
  {
    path: '*',
    component: NotFoundComponent
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
