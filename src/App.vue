<script>
import Card from './components/Card.vue'
import { ref }  from 'vue'
export default {
  name: 'WebMemoryGamev2',
  components: {
    Card
  },
  setup() {
    const TablicaKart = ref([])
    for(let i = 0; i< 16; i++){
      TablicaKart.value.push({
        value: i,
        visible:false,
        position: i
      
      })
    }
    const odwrocKarte = (payload) => {
      TablicaKart.value[payload.position].visible = true
    }
    return{
      TablicaKart,
      odwrocKarte
    }
  }
}
</script>

<template>
<h1>MemorizeIT</h1>
<section class = "plansza">
  <Card 
  v-for = "karta in TablicaKart" 
  :key="`karta-${index}`" 
  :value="karta.value"
  :visible="karta.visible"
  @wybierz-karte="odwrocKarte"
  :position = "karta.position"/>
</section>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.plansza{
  display:grid;
  grid-template-columns:100px 100px 100px 100px;
  grid-template-rows: 100px 100px 100px 100px;
  grid-column-gap: 30px;
  grid-row-gap: 30px;
}
</style>
