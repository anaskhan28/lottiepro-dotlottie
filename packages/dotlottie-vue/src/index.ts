import { defineComponent, ref, onMounted, onBeforeUnmount, watch, PropType, h } from 'vue';
import { DotLottiePlayer, DotLottieOptions } from '@lottiepro-web/dotlottie-core';

interface DotLottieProps extends DotLottieOptions {
  src: string | object | ArrayBuffer;
  style?: object;
  class?: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
  onComplete?: () => void;
  onLoopComplete?: () => void;
}

export const DotLottieComponent = defineComponent({
  name: 'DotLottieComponent',
  props: {
    src: { type: [String, Object, ArrayBuffer] as PropType<string | object | ArrayBuffer>, required: true },
    style: { type: Object as PropType<object>, default: () => ({}) },
    class: { type: String, default: '' },
    loop: { type: Boolean, default: true },
    autoplay: { type: Boolean, default: true },
    speed: { type: Number, default: 1 },
    direction: { type: Number as PropType<1 | -1>, default: 1, validator: (v: number) => v === 1 || v === -1 },
    renderer: { type: String as PropType<'svg' | 'canvas' | 'html'>, default: 'svg' }
  },
  emits: ['load', 'error', 'complete', 'loopComplete'],
  setup(props, { emit, expose }) {
    const containerRef = ref<HTMLElement | null>(null);
    const playerRef = ref<DotLottiePlayer | null>(null);
    const isLoading = ref(false);
    const error = ref<Error | null>(null);

    const createPlayer = () => {
      if (!containerRef.value) return;
      const options: DotLottieOptions = {
        loop: props.loop,
        autoplay: props.autoplay,
        speed: props.speed,
        direction: props.direction,
        renderer: props.renderer
      };
      playerRef.value = new DotLottiePlayer(containerRef.value, options);
    };

    const loadAnimation = async () => {
      if (!playerRef.value) return;
      try {
        isLoading.value = true;
        error.value = null;
        if (typeof props.src === 'string') {
          if (props.src.endsWith('.lottie')) {
            await playerRef.value.loadFromDotLottie(props.src);
          } else {
            await playerRef.value.loadFromURL(props.src);
          }
        } else if (props.src instanceof ArrayBuffer) {
          await playerRef.value.loadFromDotLottieBuffer(props.src);
        } else {
          playerRef.value.load(props.src);
        }
        emit('load');
      } catch (err) {
        const loadError = err instanceof Error ? err : new Error('Failed to load animation');
        error.value = loadError;
        emit('error', loadError);
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(() => {
      createPlayer();
      loadAnimation();
    });

    onBeforeUnmount(() => {
      playerRef.value?.destroy();
      playerRef.value = null;
    });

    watch(() => props.src, () => { loadAnimation(); });
    watch(() => props.loop, () => { if (playerRef.value) loadAnimation(); });
    watch(() => props.speed, (v) => { playerRef.value?.setSpeed(v); });
    watch(() => props.direction, (v) => { playerRef.value?.setDirection(v); });

    expose({
      play: () => playerRef.value?.play(),
      pause: () => playerRef.value?.pause(),
      stop: () => playerRef.value?.stop(),
      setSpeed: (speed: number) => playerRef.value?.setSpeed(speed),
      setDirection: (direction: 1 | -1) => playerRef.value?.setDirection(direction),
      setTheme: (theme: string) => playerRef.value?.setTheme(theme),
      setMarker: (marker: string) => playerRef.value?.setMarker(marker),
      getAvailableThemes: () => playerRef.value?.getAvailableThemes() || [],
      getAvailableMarkers: () => playerRef.value?.getAvailableMarkers() || [],
      getAvailableStates: () => playerRef.value?.getAvailableStates() || []
    });

    return () => h('div', { ref: containerRef, style: props.style, class: props.class });
  }
});

export function useDotLottieControls() {
  const lottieRef = ref<{
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
  } | null>(null);
  return lottieRef;
} 