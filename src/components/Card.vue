<script>
import { computed } from 'vue'

export default {
  props:{
    value: {
      type: String,
      required: true
    },
    visible:{
      type: Boolean,
      default:false
    },
    position:{
      type:Number,
      default:false
    },
    dopasowana:{
        type:Boolean,
        default: false
    }
  },
  setup(props,context){


const animacja = computed(() =>{
  if(props.visible) {
    return 'is-flipped'
  }

})

const wybierzKarte = () => 
context.emit('wybierz-karte',{
    position: props.position,
    faceValue: props.value
})
return{
    wybierzKarte,
    animacja
}
  }
}
</script>

<template>
  <div class="karta" @click="wybierzKarte" :class="animacja">
      <div class="strona-karty przod ">
          <img :src ="`src/assets/${value}.png`" :alt = "value" width = "110" height="110"/>
          <img v-if = "dopasowana" src="../assets/checkmark.png" class = "checkmark">
      </div>
      <div  class="strona-karty tyl">
      </div>

  </div>
</template>

<style scoped>


.karta.is-flipped{
  transform:rotateY(180deg);
  transition: 0.5s transform ease-in;
  transform-style: preserve-3d;
}
.checkmark {
  position: absolute;
  bottom: 0;
  right: 0;

}
.karta{
    position:relative;
    border: 5px solid black;
    border-radius: 8px;
}

.strona-karty{
    width: 100%;
    height: 100%;
    position:absolute;
    backface-visibility: hidden;
}

.strona-karty.przod{
  transform:rotateY(180deg);
}
.strona-karty.tyl{
    background-image: url('C:\\Users\\manam\\WebMemoryGamev2\\WebMemoryGamev2\\src\\assets\\znakza.png');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
}

</style>
