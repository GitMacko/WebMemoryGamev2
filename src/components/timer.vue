
<script>
import { ref, onMounted, onUnmounted , watch} from 'vue';

export default {
  props: {
    resetSignal: Boolean,
  },
  setup(props) {
    
    const elapsedTime = ref(0);

    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    const updateTimer = () => {
      if (elapsedTime.value >= 0) {
        elapsedTime.value++;
      }
    };

    // Uruchamianie odliczania po zamontowaniu komponentu
    onMounted(() => {
      const timerInterval = setInterval(updateTimer, 1000);

      // Zatrzymywanie odliczania po odmontowaniu komponentu
      onUnmounted(() => {
        clearInterval(timerInterval);
      });
    });


    const resetTimer = () => {
        elapsedTime.value = 0;
  
    };
    watch(() => {
      if (props.resetSignal) {
        resetTimer(); }
      
    });

    return {
      elapsedTime,
      formatTime,
      resetTimer
    };
  },
};
</script>

<template ref="startNewGame">
  <div>
    <p>Twój czas: {{ formatTime(elapsedTime) }} </p>
  </div>
</template>
