import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  private sounds: { [key: string]: HTMLAudioElement } = {};
  private enabled = true;

  constructor() {
    this.initSounds();
  }

  private initSounds(): void {
    // Create audio contexts for Web Audio API
    // For now, we'll use simple beep sounds generated programmatically
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  playSound(type: 'scan' | 'success' | 'error' | 'levelUp' | 'achievement' | 'coin' | 'click'): void {
    if (!this.enabled) return;

    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Configure sound based on type
    switch (type) {
      case 'scan':
        oscillator.frequency.value = 800;
        gainNode.gain.value = 0.3;
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1);
        break;
      
      case 'success':
        oscillator.frequency.value = 600;
        gainNode.gain.value = 0.4;
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.2);
        setTimeout(() => {
          const osc2 = audioContext.createOscillator();
          const gain2 = audioContext.createGain();
          osc2.connect(gain2);
          gain2.connect(audioContext.destination);
          osc2.frequency.value = 800;
          gain2.gain.value = 0.4;
          osc2.start();
          osc2.stop(audioContext.currentTime + 0.2);
        }, 100);
        break;
      
      case 'error':
        oscillator.frequency.value = 200;
        gainNode.gain.value = 0.3;
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.3);
        break;
      
      case 'levelUp':
        this.playMelody(audioContext, [523, 587, 659, 784]);
        return;
      
      case 'achievement':
        this.playMelody(audioContext, [659, 784, 880, 1047]);
        return;
      
      case 'coin':
        oscillator.frequency.value = 1000;
        gainNode.gain.value = 0.3;
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.05);
        break;
      
      case 'click':
        oscillator.frequency.value = 400;
        gainNode.gain.value = 0.2;
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.05);
        break;
    }
  }

  private playMelody(context: AudioContext, frequencies: number[]): void {
    frequencies.forEach((freq, index) => {
      setTimeout(() => {
        const osc = context.createOscillator();
        const gain = context.createGain();
        osc.connect(gain);
        gain.connect(context.destination);
        osc.frequency.value = freq;
        gain.gain.value = 0.3;
        osc.start();
        osc.stop(context.currentTime + 0.15);
      }, index * 100);
    });
  }

  playSuccessJingle(): void {
    this.playSound('success');
  }

  playErrorSound(): void {
    this.playSound('error');
  }

  playCoinSound(): void {
    this.playSound('coin');
  }
}

