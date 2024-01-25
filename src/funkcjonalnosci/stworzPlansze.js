import { ref } from 'vue'

const TablicaKart = ref([])

const stworzKarty = (daneTablicy) => {
    daneTablicy.forEach(item => {
        TablicaKart.value.push({
          value:item,
          visible:false,
          position:null,
          matched:false,
          dopasowana: false,
          variant: 1
        })
        TablicaKart.value.push({
          value:item,
          visible:false,
          position:null,
          matched:false,
          dopasowana: false,
          variant: 2
        })
      
        TablicaKart.value = TablicaKart.value.map((karta,index) =>
      {
        return {
          ...karta,
          position:index
        }
      })
      })
}
export default function stworzPlansze(daneTablicy) {
    stworzKarty(daneTablicy)
    return {
        TablicaKart
    }
}