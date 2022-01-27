<template>
  <div class="about">

    <h1>Garments</h1>

    <p>
      <v-text-field
        label="Search"
        v-model="garment_search" />
    </p>

    <p>
      <v-btn :to="{name: 'create_garment'}">
        Create garment
      </v-btn>
    </p>




    <v-item-group
      multiple
      v-model="selected_garments">
      <v-row>
        <v-col
          v-for="(garment, i) in searched_garments"
          :key="`garment_${i}`">

          <GarmentSelectItem :garment="garment" />

        </v-col>
      </v-row>
    </v-item-group>

    <h1>Outfits</h1>

    <p>
      <v-btn :to="{name: 'create_outfit'}">
        Create outfit
      </v-btn>
    </p>

    <v-row>
      <v-col
        v-for="(outfit, i) in outfits_matching_selection"
        :key="`outfit_${i}`">

        <OutfitPreview :outfit="outfit" />

      </v-col>
    </v-row>


  </div>
</template>

<script>

import GarmentSelectItem from '@/components/GarmentSelectItem.vue'
import OutfitPreview from '@/components/OutfitPreview.vue'

export default {
  name: 'Garments',
  components: {
    GarmentSelectItem,
    OutfitPreview
  },
  data(){
    return {
      garments: [],
      selected_garments: [],
      outfits: [],
      garment_search: '',

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
    }

  },
  computed: {
    searched_garments(){
      if(this.garment_search === '') return this.garments
      return this.garments.filter(g => g.label.toLowerCase().includes(this.garment_search.toLowerCase()))
    },
    outfits_matching_selection(){
      return this.outfits.filter(outfit =>{
        return this.selected_garments.every(i => {
          const garment_id = this.garments[i]._id
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
