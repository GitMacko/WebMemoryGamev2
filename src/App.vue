<script>
import Card from './components/Card.vue'
import timer from './components/timer.vue'
import { TransitionGroup, ref }  from 'vue'
import { watch } from 'vue'
import { computed } from 'vue'
import { odpalConfetti } from './confetti.js'

import  stworzPlansze  from './funkcjonalnosci/stworzPlansze'
import  stworzGre  from './funkcjonalnosci/stworzGre'
import  talia1   from './data/talia1.json'

export default {
  name: 'WebMemoryGamev2',
  components: {
    Card,
    TransitionGroup,
    timer
},

  setup() {

    const { TablicaKart } = stworzPlansze(talia1)
    const { nowyGracz, nowaGra, restartGry, resetTimer } = stworzGre(TablicaKart)
    const rekaGracza = ref([])
    
    const resetSignal = ref(false);





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
    watch( pozostalePary, currentValue => {
      if(currentValue === 0 ) {
        odpalConfetti()
      }
    })
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
      nowaGra,
      nowyGracz,
      resetSignal,
      resetTimer
      
    }
  }
}
</script>

<template>
<h1 class = "Tytul" >MemorizeIT</h1>


<body>
 <p class = "status">{{ status }} <timer :resetSignal = "resetSignal" /> </p>
<transition-group tag ="section" class = "plansza" name ="tasowanie">
  <Card 
  v-for = "karta in TablicaKart" 
  :key="`${karta.value}-${karta.variant}`" 
  :value="karta.value"
  :visible="karta.visible"
  @wybierz-karte="odwrocKarte"
  :position = "karta.position"
  :dopasowana = "karta.dopasowana"/>
</transition-group >

<button class = "restart" v-if = "nowyGracz" @click = "nowaGra">
<img src="assets/restart.png" alt = "Nowa gra" width="16" height="16"/></button>
<button class = "restart" v-else @click = "restartGry">
<img src="assets/restart.png" alt = "Restart" width="16" height="16"/></button>
</body>

</template>

<style scoped>
.status {
  display: flex;
  align-items: center;
  
}
.tasowanie-move{
  transition: transform 0.6s ease-in;


}
.restart {
  background-color: darkviolet;
  border-radius: 5px;
  padding: 1rem;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}
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
