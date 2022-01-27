<template>
  <div class="about">

    <v-btn :to="{name: 'create_garment'}">Create garment</v-btn>

    <v-btn :to="{name: 'garments'}">Garments</v-btn>









  </div>
</template>

<script>

export default {
  name: 'Home',
  data(){
    return {
      image_to_upload: null,
    }
  },
  methods: {
    image_upload(){

      const formData = new FormData()
      formData.append('image', this.image_to_upload)


      const url = `${process.env.VUE_APP_OUTFIT_MANAGER_API_URL}/garments/garment_id/image`

      this.axios.post(url,formData)
      .then(({data}) => {
        console.log(data)
      })
      .catch(error => {

        if(error.response) console.error(error.response.data)
        else console.error(error)

        alert(`Upload failed`)
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
