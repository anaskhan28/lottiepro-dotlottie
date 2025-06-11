# @lottiepro-web/dotlottie-core

Core functionality for dotLottie animation format support.

## Installation

```bash
npm install @lottiepro-web/dotlottie-core
```

## Usage

```typescript
import { DotLottiePlayer } from '@lottiepro-web/dotlottie-core';

const container = document.getElementById('lottie-container');
const player = new DotLottiePlayer(container);

// Load from URL
await player.loadFromDotLottie('path/to/animation.lottie');

// Load from buffer
const response = await fetch('path/to/animation.lottie');
const buffer = await response.arrayBuffer();
await player.loadFromDotLottieBuffer(buffer);

// Control playback
player.play();
player.pause();
player.stop();

// Set theme (if available)
player.setTheme('dark');

// Set marker (if available)
player.setMarker('start');
```

## Features

- Load dotLottie (.lottie) files
- Support for themes, markers, and states
- Full animation control
- TypeScript support

## License

MIT 