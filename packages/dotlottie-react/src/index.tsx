// packages/dotlottie-react/src/index.ts
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { DotLottiePlayer, DotLottieOptions } from '@lottiepro-web/dotlottie-core';

export interface DotLottieRef {
  play: () => void;
  pause: () => void;
  stop: () => void;
  setSpeed: (speed: number) => void;
  setDirection: (direction: 1 | -1) => void;
  setTheme: (theme: string) => void;
  setMarker: (marker: string) => void;
  getAvailableThemes: () => string[];
  getAvailableMarkers: () => string[];
  getAvailableStates: () => string[];
}

interface DotLottieProps extends DotLottieOptions {
  src: string | object | ArrayBuffer;
  style?: React.CSSProperties;
  className?: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
  onComplete?: () => void;
  onLoopComplete?: () => void;
}

export const DotLottieComponent = forwardRef<DotLottieRef, DotLottieProps>(
  function DotLottieComponent(
    props: DotLottieProps,
    ref: React.ForwardedRef<DotLottieRef>
  ) {
    const { src, style, className, onLoad, onError, onComplete, onLoopComplete, loop, autoplay, renderer, ...options } = props;
    const containerRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<DotLottiePlayer | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
      if (!containerRef.current) return;

      const player = new DotLottiePlayer(containerRef.current, options);
      playerRef.current = player;

      const loadAnimation = async () => {
        try {
          setIsLoading(true);
          setError(null);

          if (typeof src === 'string') {
            if (src.endsWith('.lottie')) {
              await player.loadFromDotLottie(src);
            } else {
              await player.loadFromURL(src);
            }
          } else if (src instanceof ArrayBuffer) {
            await player.loadFromDotLottieBuffer(src);
          } else {
            player.load(src);
          }
          onLoad?.();
        } catch (err) {
          const loadError = err instanceof Error ? err : new Error("Failed to load animation");
          setError(loadError);
          onError?.(loadError);
        } finally {
          setIsLoading(false);
        }
      };

      loadAnimation();

      return () => {
        player.destroy();
        playerRef.current = null;
      };
    }, [src, loop, autoplay, renderer]);

    useImperativeHandle(ref, () => ({
      play: () => playerRef.current?.play(),
      pause: () => playerRef.current?.pause(),
      stop: () => playerRef.current?.stop(),
      setSpeed: (speed: number) => playerRef.current?.setSpeed(speed),
      setDirection: (direction: 1 | -1) => playerRef.current?.setDirection(direction),
      setTheme: (theme: string) => playerRef.current?.setTheme(theme),
      setMarker: (marker: string) => playerRef.current?.setMarker(marker),
      getAvailableThemes: () => playerRef.current?.getAvailableThemes() || [],
      getAvailableMarkers: () => playerRef.current?.getAvailableMarkers() || [],
      getAvailableStates: () => playerRef.current?.getAvailableStates() || []
    }), []);

    return <div ref={containerRef} style={style} className={className} />;
  }
);

export const useDotLottieControls = () => {
  const ref = useRef<DotLottieRef>(null);
  return ref;
};