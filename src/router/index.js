import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue')
  },
  {
    path: '/garments',
    name: 'garments',
    component: () => import('../views/Garments.vue'),
    alias: '/',
  },
  {
    path: '/garments/new',
    name: 'create_garment',
    component: () => import('../views/CreateGarment.vue')
  },
  {
    path: '/garments/:garment_id',
    name: 'garment',
    component: () => import('../views/Garment.vue')
  },
  {
    path: '/outfits',
    name: 'outfits',
    component: () => import('../views/Outfits.vue')
  },
  {
    path: '/outfits/new',
    name: 'create_outfit',
    component: () => import('../views/CreateOutfit.vue')
  },
  {
    path: '/outfitcomposer',
    name: 'outfit_composer',
    component: () => import('../views/OutfitComposer.vue')
  },
  {
    path: '/outfits/:outfit_id',
    name: 'outfit',
    component: () => import('../views/Outfit.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
