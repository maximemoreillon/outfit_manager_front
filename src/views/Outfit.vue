<template>
  <v-card max-width="700" class="mx-auto">

    <template v-if="outfit">

    <v-toolbar flat>
      <v-btn
        icon
        exact
        :to="{name: 'outfits'}">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>Outfit {{outfit._id}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        icon
        color="#c00000"
        @click="delete_outfit()">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-toolbar>
    <v-divider></v-divider>


      <v-img
        class='mt-3'
        :src="image_src"
        max-height="400"
        contain/>

      <v-card-text>

        <h2>Garments in this outfit</h2>

        <v-row v-if="garments_part_of_this_outfit.length">
          <v-col
            v-for="(garment, i) in garments_part_of_this_outfit"
            :key="`garment_${i}`">

            <GarmentPreview :garment="garment" >
              <template v-slot:actions>
                <v-btn @click="remove_garment(i)">remove</v-btn>
              </template>
            </GarmentPreview>

          </v-col>
        </v-row>

        <p v-else>No garment</p>


        <h2>Add garments</h2>

        <p>
          <v-text-field
            label="search garments"
            v-model="garment_search" />
        </p>

        <v-item-group
          multiple
          v-model="selected_garment_indices">
          <v-row>
            <v-col
              v-for="(garment, i) in garments_not_part_of_this_outfit"
              :key="`garment_${i}`">

              <GarmentPreview :garment="garment">
                <template v-slot:actions>
                  <v-btn @click="add_garment(garment)">Add</v-btn>
                </template>
              </GarmentPreview>

            </v-col>
          </v-row>
        </v-item-group>

        <p>
          <v-btn @click="update_outfit()">Save</v-btn>
        </p>



      </v-card-text>

      <v-card-text>

        <h2>Update image</h2>
        <v-form @submit.prevent="image_update()">
          <v-row>
            <v-col>
              <v-file-input
              accept="image/*"
              label="File input"
              v-model="image_to_upload"/>
            </v-col>
            <v-col cols="auto">
              <v-btn type="submit">Submit</v-btn>
            </v-col>

          </v-row>


        </v-form>

      </v-card-text>



    </template>


  </v-card>
</template>

<script>
import GarmentPreview from '@/components/GarmentPreview.vue'

export default {
  name: 'Outfit',
  components: {
    GarmentPreview,
  },
  data(){
    return {
      image_to_upload: null,
      outfit: null,
      garments: [],
      selected_garment_indices: [],
      garment_search: '',


    }
  },
  mounted(){
    this.get_outfit(),
    this.get_garments()
  },
  methods: {
    get_outfit(){
      const url = `${process.env.VUE_APP_OUTFIT_MANAGER_API_URL}/outfits/${this.outfit_id}/`

      this.axios.get(url)
      .then(({data}) => {
        this.outfit = data
      })
      .catch(error => {

        if(error.response) console.error(error.response.data)
        else console.error(error)

        alert(`failed`)
      })
    },
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
    add_garment(garment){
      this.outfit.garments.push(garment._id)
      this.update_outfit()
    },
    remove_garment(index){
      this.outfit.garments.splice(index,1)
      this.update_outfit()
    },
    update_outfit(){

        const url = `${process.env.VUE_APP_OUTFIT_MANAGER_API_URL}/outfits/${this.outfit_id}`
        const body = {...this.outfit}
        this.axios.patch(url,body)
        .then(() => {
          this.get_outfit()
          this.selected_garment_indices = []
        })
        .catch(error => {

          if(error.response) console.error(error.response.data)
          else console.error(error)

          alert(`Upload failed`)
        })
    },
    delete_outfit(){
      if(!confirm(`Delete outfit?`)) return
      const url = `${process.env.VUE_APP_OUTFIT_MANAGER_API_URL}/outfits/${this.outfit_id}/`

      this.axios.delete(url)
      .then(() => {
        this.$router.push({name: 'outfits'})
      })
      .catch(error => {

        if(error.response) console.error(error.response.data)
        else console.error(error)

        alert(`failed`)
      })
    },
    image_update(){

      const formData = new FormData()
      formData.append('image', this.image_to_upload)


      const url = `${process.env.VUE_APP_OUTFIT_MANAGER_API_URL}/outfits/${this.outfit_id}/image`

      this.axios.post(url,formData)
      .then(() => {
        this.get_outfit()
      })
      .catch(error => {

        if(error.response) console.error(error.response.data)
        else console.error(error)

        alert(`Upload failed`)
      })

    }
  },
  computed: {
    outfit_id(){
      return this.$route.params.outfit_id
    },
    image_src(){
      return `${process.env.VUE_APP_OUTFIT_MANAGER_API_URL}/outfits/${this.outfit_id}/image`
    },
    selected_garments(){
      return this.selected_garment_indices.map(i => this.garments[i])
    },
    selected_garment_ids(){
      return this.selected_garment_indices.map(i => this.garments[i]._id)
    },
    searched_garments(){
      if(this.garment_search === '') return this.garments
      return this.garments.filter(g => g.label.toLowerCase().includes(this.garment_search.toLowerCase()))
    },
    garments_part_of_this_outfit(){
      return this.garments.filter(g => this.outfit.garments.includes(g._id))
    },
    garments_not_part_of_this_outfit(){
      return this.searched_garments.filter(g => !this.outfit.garments.includes(g._id))
    },
  }

}
</script>

<style>
.outfits_wrapper {
  display: flex;
}
</style>
