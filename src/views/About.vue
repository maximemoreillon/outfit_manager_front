<template>
  <v-card>
    <v-card-title>Outfit manager</v-card-title>
      <v-card-subtitle>v{{version}}</v-card-subtitle>


    <v-card-text>
      <p>Author: Maxime MOREILLON</p>
      <v-data-table
        hide-default-footer
        :itemsPerPage="-1"
        :headers="headers"
        :items="services"/>
    </v-card-text>


  </v-card>
</template>

<script>
import {version} from '@/../package.json'
export default {
  name: 'About',
  data () {
    return {
      version,
      headers: [
        {text: 'Service', value: "name"},
        {text: 'URL', value: "url"},

      ],
      services: [

        {
          name: 'Back-end URL',
          url: process.env.VUE_APP_OUTFIT_MANAGER_API_URL,
        },
        {
          name: 'Login URL',
          url: process.env.VUE_APP_LOGIN_URL,
        },
         {
          name: 'Identification URL',
          url: process.env.VUE_APP_IDENTIFICATION_URL,
        },
      ],
    }
  },


}
</script>

<style scoped>


</style>
