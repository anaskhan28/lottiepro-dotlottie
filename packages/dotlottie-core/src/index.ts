// packages/dotlottie-core/src/index.ts
import { LottiePlayer, LottieOptions } from '@lottiepro-web/core';
import JSZip from 'jszip';

export interface DotLottieOptions extends LottieOptions {
  // Additional options specific to dotlottie
  theme?: string;
  marker?: string;
  state?: string;
}

export class DotLottiePlayer extends LottiePlayer {
  private dotLottieData: any = null;
  private currentTheme: string | null = null;
  private currentMarker: string | null = null;

  constructor(container: HTMLElement, options: DotLottieOptions = {}) {
    super(container, options);
  }

  async loadFromDotLottie(url: string): Promise<void> {
    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      await this.loadFromDotLottieBuffer(arrayBuffer);
    } catch (error) {
      console.error('Error loading dotlottie:', error);
      throw error;
    }
  }

  async loadFromDotLottieBuffer(buffer: ArrayBuffer): Promise<void> {
    try {
      // Parse the .lottie file (it's a ZIP archive)
      const dotLottieData = await this.parseDotLottie(buffer);
      this.dotLottieData = dotLottieData;
      
      // Load the first animation by default
      if (dotLottieData.animations && dotLottieData.animations.length > 0) {
        await this.loadAnimation(dotLottieData.animations[0]);
      }
    } catch (error) {
      console.error('Error parsing dotlottie:', error);
      throw error;
    }
  }

  private async parseDotLottie(buffer: ArrayBuffer): Promise<any> {
    // Use JSZip to parse the .lottie (ZIP) file
    const zip = await JSZip.loadAsync(buffer);
    // Find the first animation JSON (commonly in 'animations/animation.json')
    let animationJson = null;
    for (const fileName of Object.keys(zip.files)) {
      if (fileName.endsWith('.json') && fileName.startsWith('animations/')) {
        const file = zip.file(fileName);
        if (file) {
          const text = await file.async('text');
          animationJson = JSON.parse(text);
          break;
        }
      }
    }
    if (!animationJson) {
      throw new Error('No animation JSON found in .lottie file');
    }
    // Optionally, extract themes, markers, states, etc. from the ZIP if present
    // For now, just return an object with the animation
    return {
      animations: [animationJson],
      // TODO: extract themes, markers, states if needed
    };
  }

  async loadAnimation(animationData: any): Promise<void> {
    this.load(animationData);
  }

  setTheme(theme: string): void {
    if (this.dotLottieData?.themes?.[theme]) {
      this.currentTheme = theme;
      // Apply theme to current animation
      this.applyTheme(theme);
    }
  }

  setMarker(marker: string): void {
    if (this.dotLottieData?.markers?.[marker]) {
      this.currentMarker = marker;
      // Jump to marker
      const markerData = this.dotLottieData.markers[marker];
      this.goToFrame(markerData.frame);
    }
  }

  private applyTheme(theme: string): void {
    // Apply theme colors to animation
    const themeData = this.dotLottieData.themes[theme];
    // Implementation depends on how themes are structured
  }

  getAvailableThemes(): string[] {
    return Object.keys(this.dotLottieData?.themes || {});
  }

  getAvailableMarkers(): string[] {
    return Object.keys(this.dotLottieData?.markers || {});
  }

  getAvailableStates(): string[] {
    return Object.keys(this.dotLottieData?.states || {});
  }
}