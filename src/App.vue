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
      rekaGracza.value[0].position ===  payload.position && rekaGracza.value[0].faceValue === payload.faceValue)
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
<h1 class = "Tytul" >MemorizeIT</h1>
<body>
<p class = "status">{{ status }}</p>
<section class = "plansza">
  <Card 
  v-for = "karta in TablicaKart" 
  :key="`karta-${index}`" 
  :value="karta.value"
  :visible="karta.visible"
  @wybierz-karte="odwrocKarte"
  :position = "karta.position"/>
</section>
<button class = "restart" @click = "restartGry">Restart gry</button>
</body>

</template>

<style scoped>
html{
  margin:0;
  padding:0;
}
p{
  position:absolute;
  top:0;
  margin-left: 40px;
  margin-top:10px;
  font-size:30px;
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  color: lightgreen;
}
.restart{
  margin-left: 20px;
  margin-right: 20px;
}
.Tytul {
  font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  font-size: 5rem;
  color: red;
}
body {
  background-image: url('assets/tlo.jpg');
  background: cover;
  background-size: cover;
  background-repeat: no-repeat;
  margin:0;
  padding:0;
}

header {
  line-height: 1.5;
}

.plansza{
  display:grid;
  grid-template-columns:120px 120px 120px 120px;
  grid-template-rows: 120px 120px 120px 120px;
  grid-column-gap: 35px;
  grid-row-gap: 35px;
  margin-left: 55px;
}
</style>
