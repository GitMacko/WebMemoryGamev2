<script>
import Card from './components/Card.vue'
import { ref }  from 'vue'
import { watch } from 'vue'
import { computed } from 'vue'
import _ from 'lodash'

export default {
  name: 'WebMemoryGamev2',
  components: {
    Card
  },
  setup() {
    const TablicaKart = ref([])
    const rekaGracza = ref([])

    const status = computed(() =>{
      if(pozostalePary.value == 0) {
        return 'Wygrywasz!'
      } else {
        return `Pozostałe karty: ${pozostalePary.value}`
     }  } )

    const pozostalePary = computed(() => {
      const pozostaleKarty = TablicaKart.value.filter(
        karta => karta.dopasowana === false).length

        return pozostaleKarty
    })

    const restartGry = () => {
    tasujTablice()
    TablicaKart.value = TablicaKart.value.map(
      (karta, index) => {
        return {
          ...karta,
          dopasowana: false,
          visible: false,
          position: index
        }
      }
    )
  }


  const tasujTablice = () => {
    TablicaKart.value = _.shuffle(TablicaKart.value)
  }



 /*   const pozostalePary = computed(() => {
      const pozostaleKarty = TablicaKart.value.filter
      (karta => karta.dopasowana === false).length
           return pozostaleKarty / 2
     })*/

 /*   for(let i = 0; i< 16; i++){
      TablicaKart.value.push({
        value: 5,
        visible:false,
        position: i,
        dopasowana: false
      
      })
    }*/
const zestawy = [1,2,3,4,5,6,7,8]

zestawy.forEach(item => {
  TablicaKart.value.push({
    value:item,
    visible:false,
    position:null,
    matched:false
  })

  TablicaKart.value.push({
    value:item,
    visible:false,
    position:null,
    matched:false
  })

  TablicaKart.value = TablicaKart.value.map((karta,index) =>
{
  return {
    ...karta,
    position:index
  }
})
})








    const odwrocKarte = (payload) => {
      TablicaKart.value[payload.position].visible = true
      if(rekaGracza.value[0]){
        if(
      rekaGracza.value[0].position ===
    payload.position && rekaGracza.value[0].faceValue === payload.faceValue)
    { return } else { }
        rekaGracza.value[1]= payload
      } else {
        rekaGracza.value[0] = payload
      }
    }

    watch(rekaGracza, currentValue => { 
    if (currentValue.length === 2){
      const kartaPierwsza = currentValue[0]
      const kartaDruga = currentValue[1]
      if(kartaPierwsza.faceValue === kartaDruga.faceValue){
        TablicaKart.value[kartaPierwsza.position].dopasowana = true
        TablicaKart.value[kartaDruga.position].dopasowana = true
      } else {
      setTimeout( () => {
          TablicaKart.value[kartaPierwsza.position].visible = false
          TablicaKart.value[kartaDruga.position].visible = false
        }, 2000)
      }
      rekaGracza.value.length = 0}
    }, {deep: true})

    return{
      TablicaKart,
      odwrocKarte,
      rekaGracza,
      pozostalePary,
      status,
      restartGry,
      tasujTablice
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
<h2>{{ rekaGracza }}</h2>
<p>{{ status }}</p>
<button @click = "restartGry">Restart gry</button>
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
