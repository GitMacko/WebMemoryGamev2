<script>
import Card from './components/Card.vue'
export default {
  name: 'WebMemoryGamev2',
  components: {
    Card
  },
  setup() {
    const TablicaKart = []
    for(let i = 0; i< 16; i++){
      TablicaKart.push(i)
    }
    return{
      TablicaKart
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
  :value="karta"/>
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
