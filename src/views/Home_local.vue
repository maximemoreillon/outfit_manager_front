<template>
  <div class="">

    <v-item-group
      multiple
      v-model="selected_garments">
      <v-row>
        <v-col
          v-for="(garment, i) in garments"
          :key="`garment_${i}`">

          <v-item v-slot="{ active, toggle }">
            <v-card
              max-width="200"
              :color="active ? 'primary' : ''"
              @click="toggle">

              <v-img
                height="200"
                contain
                :src="garment.image"/>

              <v-card-title>{{garment.label}}</v-card-title>
              <v-card-text>
                <div class="">
                  ID: {{garment._id}}
                </div>
              </v-card-text>
            </v-card>
          </v-item>


        </v-col>
      </v-row>
    </v-item-group>





    <h2>Outfits</h2>

    <v-row>
      <v-col
      v-for="(outfit, i) in filtered_outfits"
      :key="`outfit_${i}`">
        <v-card
          max-width="300">

          <v-img
            max-height="200"
            contain
            :src="outfit.image"/>

          <v-card-title>{{outfit.label}}</v-card-title>
        </v-card>
      </v-col>
    </v-row>



  </div>
</template>

<script>
import garments from '@/garments.js'
import outfits from '@/outfits.js'

export default {
  name: 'Home',
  data(){
    return {
      garments,
      outfits,
      selected_garments: [],
    }
  },
  computed: {
    filtered_outfits(){
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
