import { ref }  from 'vue'
import _ from 'lodash'



export default function stworzGre(talia) {
const nowyGracz = ref(true)



const nowaGra = () => {
    nowyGracz.value = false
    restartGry()
  }

const resetTimer = () => {      
      
    resetSignal.value = !resetSignal.value;

}

const restartGry = () => {
    talia.value = _.shuffle(talia.value)
    talia.value = talia.value.map(
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
  return {
    nowyGracz,
    nowaGra,
    restartGry,
    resetTimer
}
}