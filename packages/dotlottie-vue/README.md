# @lottiepro-web/dotlottie-vue

Vue components for dotLottie animation format.

## Installation

```bash
npm install @lottiepro-web/dotlottie-vue
```

## Usage

```vue
<template>
  <div>
    <DotLottiePlayer
      :src="animationSrc"
      :style="{ width: '300px', height: '300px' }"
      :autoplay="true"
      :loop="true"
    />
  </div>
</template>

<script setup lang="ts">
import { DotLottiePlayer } from '@lottiepro-web/dotlottie-vue';

const animationSrc = 'path/to/animation.lottie';
</script>
```

## Props

- `src`: Path to the .lottie file
- `autoplay`: Whether to start playing automatically
- `loop`: Whether to loop the animation
- `speed`: Playback speed (default: 1)
- `theme`: Theme to apply (if available)
- `marker`: Marker to start from (if available)
- `style`: CSS styles for the container
- `class`: CSS class name for the container

## Features

- Vue component wrapper for dotLottie
- Full TypeScript support
- All core functionality available
- Easy to use props interface

## License

MIT 