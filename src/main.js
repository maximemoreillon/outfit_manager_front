import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import vuetify from "./plugins/vuetify"
import axios from "axios"
import VueAxios from "vue-axios"
import VueCookies from "vue-cookies"
import "./registerServiceWorker"
import OidcAuth from "@moreillon/oidc-auth"

const {
  VUE_APP_OUTFIT_MANAGER_API_URL,
  VUE_APP_OIDC_AUTHORITY,
  VUE_APP_OIDC_CLIENT_ID,
} = process.env

axios.defaults.baseURL = VUE_APP_OUTFIT_MANAGER_API_URL

Vue.use(VueAxios, axios)
Vue.use(VueCookies)

Vue.config.productionTip = false

if (VUE_APP_OIDC_AUTHORITY && VUE_APP_OIDC_CLIENT_ID) {
  const auth = new OidcAuth({
    authority: VUE_APP_OIDC_AUTHORITY,
    client_id: VUE_APP_OIDC_CLIENT_ID,
  })
  auth.init().then((user) => {
    new Vue({
      router,
      store,
      vuetify,
      render: (h) => h(App),
    }).$mount("#app")
    axios.defaults.headers.common["Authorization"] = `Bearer ${user.id_token}`
  })

  auth.userManager.events.addUserLoaded((user) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${user.id_token}`
  })
} else {
  new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
  }).$mount("#app")
}
