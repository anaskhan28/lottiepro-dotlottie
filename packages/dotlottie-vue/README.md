# @lottiepro-web/dotlottie-vue

A Vue 3 component for rendering .lottie and .json animations using @lottiepro-web/dotlottie-core.

## Usage

```vue
<script setup lang="ts">
import { DotLottieComponent, useDotLottieControls } from '@lottiepro-web/dotlottie-vue';
const lottieRef = useDotLottieControls();
</script>

<template>
  <DotLottieComponent
    ref="lottieRef"
    src="/path/to/animation.lottie"
    :loop="true"
    style="width: 400px; height: 400px;"
  />
  <button @click="lottieRef.value?.play()">Play</button>
</template>
``` 