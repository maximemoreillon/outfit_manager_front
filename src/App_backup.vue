<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark >

      <v-app-bar-nav-icon @click="drawer = !drawer" />

      <v-toolbar-title>Outfit manager</v-toolbar-title>

    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app>

      <v-list
        nav >

        <v-list-item :to="{name: 'garments'}">
          <v-list-item-title>Garments</v-list-item-title>
        </v-list-item>

        <v-list-item :to="{name: 'outfits'}">
          <v-list-item-title>Outfits</v-list-item-title>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>

    <v-main class="grey lighten-4">
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    drawer: false,
  }),
};
</script>
