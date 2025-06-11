<p align="center">
  <img src="https://res.cloudinary.com/anaskhan/image/upload/v1744609327/lottiepro/LottiePro_white_h5djkc.png" alt="LottiePro Logo" width="200"/>
</p>

# LottiePro DotLottie Engine

A high-performance, cross-framework DotLottie animation solution for React, Vue, and vanilla JavaScript projects. Support for `.lottie` files with themes, markers, and states.

## Demo
![Example1](https://res.cloudinary.com/anaskhan/image/upload/v1744612516/lottiepro/LottiePro_Player_onym1q.gif)

## Features ✨

- **Multi-Framework Support**: Seamless integration with React, Vue, and vanilla JavaScript
- **DotLottie Support**: Full support for `.lottie` files with themes, markers, and states
- **Performance-Optimized**: Faster rendering and minimal runtime overhead
- **Complete Control API**: Play/pause/stop, speed control, direction reversal, theme switching
- **Flexible Loading**: Stream animations from URL, local JSON data, or `.lottie` files
- **Rendering Options**: Choose between SVG, Canvas, or HTML renderers
- **TypeScript-Powered**: Full type safety and autocompletion
- **Lightweight**: Minimal bundle size impact
- **Event System**: Rich callbacks for animation lifecycle events
- **Theme Support**: Switch between multiple themes in a single `.lottie` file
- **Marker Support**: Jump to specific markers in animations
- **State Support**: Manage different animation states

## Installation ⚡

```bash
# For React
pnpm add @lottiepro-web/dotlottie-core @lottiepro-web/dotlottie-react
npm install @lottiepro-web/dotlottie-core @lottiepro-web/dotlottie-react

# For Vue
pnpm add @lottiepro-web/dotlottie-core @lottiepro-web/dotlottie-vue
npm install @lottiepro-web/dotlottie-core @lottiepro-web/dotlottie-vue

# For vanilla JavaScript
pnpm add @lottiepro-web/dotlottie-core
npm install @lottiepro-web/dotlottie-core
```

## Quick Start 🚀

### React
```tsx
import { DotLottieComponent, useDotLottieControls } from '@lottiepro-web/dotlottie-react'

function App() {
  const lottieRef = useDotLottieControls();

  const handleThemeChange = () => {
    const themes = lottieRef.current?.getAvailableThemes();
    if (themes && themes.length > 0) {
      lottieRef.current?.setTheme(themes[0]);
    }
  };

  return (
    <>
      <DotLottieComponent
        ref={lottieRef}
        src="https://cdn.lottiepro.com/animation.lottie"
        style={{ width: 400, height: 400 }}
        loop={true}
        autoplay={true}
        onLoad={() => console.log('Loaded!')}
        onComplete={() => console.log('Animation completed!')}
      />
      <button onClick={() => lottieRef.current?.play()}>Play</button>
      <button onClick={() => lottieRef.current?.pause()}>Pause</button>
      <button onClick={handleThemeChange}>Change Theme</button>
    </>
  );
}
```

### Vue
```vue
<script setup>
import { DotLottieComponent, useDotLottieControls } from '@lottiepro-web/dotlottie-vue'

const lottieRef = useDotLottieControls()

const handleThemeChange = () => {
  const themes = lottieRef.value?.getAvailableThemes();
  if (themes && themes.length > 0) {
    lottieRef.value?.setTheme(themes[0]);
  }
};
</script>

<template>
  <DotLottieComponent
    ref="lottieRef"
    src="/animation.lottie"
    :loop="true"
    :autoplay="true"
    style="width: 400px; height: 400px"
    @load="() => console.log('Loaded!')"
    @complete="() => console.log('Animation completed!')"
  />
  <button @click="lottieRef?.play()">Play</button>
  <button @click="lottieRef?.pause()">Pause</button>
  <button @click="handleThemeChange">Change Theme</button>
</template>
```

### Vanilla JavaScript
```javascript
import { DotLottiePlayer } from '@lottiepro-web/dotlottie-core'

const container = document.getElementById('lottie-container');
const player = new DotLottiePlayer(container, {
  loop: true,
  autoplay: true,
  renderer: 'svg'
});

// Load from .lottie file
await player.loadFromDotLottie('https://cdn.lottiepro.com/animation.lottie');

// Or load from ArrayBuffer
const response = await fetch('animation.lottie');
const buffer = await response.arrayBuffer();
await player.loadFromDotLottieBuffer(buffer);

// Control the animation
player.play();
player.pause();
player.setSpeed(2);
player.setTheme('dark');
player.setMarker('intro');
```

## API Reference

### DotLottieComponent Props

| Property        | Type                     | Default   | Description                                |
|-----------------|--------------------------|-----------|--------------------------------------------|
| `src`           | `string \| object \| ArrayBuffer` | required  | Animation source URL, data object, or .lottie file |
| `loop`          | `boolean`                | `false`   | Whether to loop the animation             |
| `autoplay`      | `boolean`                | `true`    | Start animation immediately when loaded   |
| `renderer`      | `'svg' \| 'canvas' \| 'html'` | `'svg'`   | Rendering method                          |
| `speed`         | `number`                 | `1`       | Animation playback speed                  |
| `direction`     | `1 \| -1`                | `1`       | Animation direction (forward/reverse)     |
| `theme`         | `string`                 | -         | Initial theme to apply                    |
| `marker`        | `string`                 | -         | Initial marker to start from              |
| `state`         | `string`                 | -         | Initial state to apply                    |

### Events

| Event           | Description                                |
|-----------------|--------------------------------------------|
| `onLoad`        | Fires when animation is loaded and ready   |
| `onError`       | Fires when an error occurs loading the animation |
| `onComplete`    | Fires when animation completes playing     |
| `onLoopComplete`| Fires when animation loop completes        |

### DotLottieRef Methods

| Method                    | Description                                |
|---------------------------|--------------------------------------------|
| `play()`                  | Start playing the animation                |
| `pause()`                 | Pause the animation                        |
| `stop()`                  | Stop and reset the animation               |
| `setSpeed(speed: number)` | Set animation playback speed               |
| `setDirection(direction: 1 \| -1)` | Set animation direction (forward/reverse) |
| `setTheme(theme: string)` | Switch to a different theme               |
| `setMarker(marker: string)` | Jump to a specific marker                 |
| `getAvailableThemes()`    | Get list of available themes               |
| `getAvailableMarkers()`   | Get list of available markers              |
| `getAvailableStates()`    | Get list of available states               |

## DotLottie Features

### Themes
DotLottie files can contain multiple themes. Switch between them dynamically:

```tsx
const themes = lottieRef.current?.getAvailableThemes();
// ['light', 'dark', 'colorful']
lottieRef.current?.setTheme('dark');
```

### Markers
Jump to specific points in your animation:

```tsx
const markers = lottieRef.current?.getAvailableMarkers();
// ['intro', 'loop', 'outro']
lottieRef.current?.setMarker('intro');
```

### States
Manage different animation states:

```tsx
const states = lottieRef.current?.getAvailableStates();
// ['idle', 'hover', 'click']
lottieRef.current?.setState('hover');
```

## File Format Support

- **`.lottie` files**: Full support with themes, markers, and states
- **`.json` files**: Standard Lottie JSON format
- **URLs**: Load from remote sources
- **ArrayBuffer**: Load from binary data

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS/Android)

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT License - see LICENSE file for details.
