<template>
  <v-card>



    <v-row>
      <v-col>
        <v-card-title>Garments</v-card-title>
        <v-card-text>
          <v-data-table
            :search="search"
            v-model="selected_garments"
            :headers="headers"
            :items="garments"
            item-key="_id"
            :single-select="false"
            show-select
            :items-per-page="-1">

            <template v-slot:top>
              <v-toolbar
                flat>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  hide-details/>

                <v-spacer/>

                <v-btn
                  :to="{name: 'create_garment'}">
                  <v-icon>mdi-plus</v-icon>
                  <span>New garment</span>
                </v-btn>

              </v-toolbar>
            </template>


            <template v-slot:item.image="{ item }">
              <v-img
                width="7.5em"
                height="7.5em"
                contain
                v-if="item.image"
                :src="image_src(item)" />
            </template>

            <template v-slot:item.details="{ item }">
              <v-btn
                :to="{name: 'garment', params: {garment_id: item._id}}"
                >See more</v-btn>
            </template>

          </v-data-table>
        </v-card-text>
      </v-col>
      <v-col>

        <v-card-title>Outfits</v-card-title>

        <v-row justify="start">
          <v-col
            v-for="(outfit, i) in outfits_matching_selection"
            :key="`outfit_${i}`">
            <OutfitPreview :outfit="outfit" />
          </v-col>
        </v-row>


      </v-col>
    </v-row>




  </v-card>
</template>

<script>

import OutfitPreview from '@/components/OutfitPreview.vue'

export default {
  name: 'Garments',
  components: {
    OutfitPreview
  },
  data(){
    return {
      benched: 0,
      garments: [],
      selected_garments: [],
      outfits: [],
      search: '',
      headers: [
        { text: 'Image', value: 'image'},
        { text: 'Name', value: 'label'},
        { text: 'Color', value: 'color'},
        { text: 'Details', value: 'details'},
      ],

    }
  },
  mounted(){
    this.get_garments()
    this.get_outfits()
  },
  methods: {
    get_garments(){
      const url = `${process.env.VUE_APP_OUTFIT_MANAGER_API_URL}/garments/`


      this.axios.get(url)
      .then(({data}) => {
        this.garments = data
      })
      .catch(error => {

        if(error.response) console.error(error.response.data)
        else console.error(error)

        alert(`failed`)
      })
    },
    get_outfits(){
      const url = `${process.env.VUE_APP_OUTFIT_MANAGER_API_URL}/outfits/`


      this.axios.get(url)
      .then(({data}) => {
        this.outfits = data
      })
      .catch(error => {

        if(error.response) console.error(error.response.data)
        else console.error(error)

        alert(`failed`)
      })
    },
    image_src(item){
      return `${process.env.VUE_APP_OUTFIT_MANAGER_API_URL}/garments/${item._id}/thumbnail`
    },
    outfit_preview_src(item){
      return `${process.env.VUE_APP_OUTFIT_MANAGER_API_URL}/outfits/${item._id}/thumbnail`
    }


  },
  computed: {
    searched_garments(){
      if(this.garment_search === '') return this.garments
      return this.garments.filter(g => g.label.toLowerCase().includes(this.garment_search.toLowerCase()))
    },
    outfits_matching_selection(){
      return this.outfits.filter(outfit => {

        return this.selected_garments.every(g => {
          const garment_id = g._id
          return outfit.garments.includes(garment_id)
        })
      })
    }
  }

}
</script>

<style>
.outfits_wrapper {
  display: flex;
}
</style>
