<script setup lang="ts">
import { DotLottieComponent, useDotLottieControls } from '@lottiepro-web/dotlottie-vue';
import { onMounted } from 'vue';

const lottieRef = useDotLottieControls();

const handleLoad = () => {
  console.log('Animation loaded!');
};

const handleError = (error: Error) => {
  console.error('Failed to load animation:', error);
};
</script>

<template>
  <div class="container">
    <DotLottieComponent
      ref="lottieRef"
      src="https://res.cloudinary.com/anaskhan/raw/upload/v1749145365/lottiepro/volcano_mmfo32.lottie"
      :style="{ width: '400px', height: '400px' }"
      :loop="true"
      :autoplay="true"
      @load="handleLoad"
      @error="handleError"
    />

    <div class="controls">
      <button @click="lottieRef.value?.play()">Play</button>
      <button @click="lottieRef.value?.pause()">Pause</button>
      <button @click="lottieRef.value?.stop()">Stop</button>
      <button @click="lottieRef.value?.setSpeed(0.5)">Slow Motion</button>
      <button @click="lottieRef.value?.setSpeed(2)">Fast Forward</button>
      <button @click="lottieRef.value?.setDirection(-1)">Reverse</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  gap: 1rem;
}

.controls {
  display: flex;
  gap: 0.5rem;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: #646cff;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #535bf2;
}
</style> 