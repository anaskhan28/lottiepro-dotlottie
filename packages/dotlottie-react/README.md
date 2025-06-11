# @lottiepro-web/dotlottie-react

React components for dotLottie animation format.

## Installation

```bash
npm install @lottiepro-web/dotlottie-react
```

## Usage

```tsx
import React from 'react';
import { DotLottiePlayer } from '@lottiepro-web/dotlottie-react';

function App() {
  return (
    <div>
      <DotLottiePlayer
        src="path/to/animation.lottie"
        style={{ width: 300, height: 300 }}
        autoplay
        loop
      />
    </div>
  );
}

export default App;
```

## Props

- `src`: Path to the .lottie file
- `autoplay`: Whether to start playing automatically
- `loop`: Whether to loop the animation
- `speed`: Playback speed (default: 1)
- `theme`: Theme to apply (if available)
- `marker`: Marker to start from (if available)
- `style`: CSS styles for the container
- `className`: CSS class name for the container

## Features

- React component wrapper for dotLottie
- Full TypeScript support
- All core functionality available
- Easy to use props interface

## License

MIT 