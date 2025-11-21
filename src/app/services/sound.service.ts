import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  private sounds: { [key: string]: HTMLAudioElement } = {};
  private enabled = true;
  private audioContext: AudioContext | null = null;

  constructor() {
    this.initAudioContext();
    this.preloadSounds();
  }

  private initAudioContext(): void {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (e) {
      console.warn('Web Audio API not supported');
    }
  }

  private preloadSounds(): void {
    // Preload common sound files if they exist
    const soundFiles = ['cash-register', 'coin', 'success', 'error', 'level-up'];
    soundFiles.forEach(sound => {
      const audio = new Audio();
      audio.src = `assets/sounds/${sound}.mp3`;
      audio.load();
      this.sounds[sound] = audio;
    });
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  playSound(type: 'scan' | 'success' | 'error' | 'levelUp' | 'achievement' | 'coin' | 'click' | 'purchase'): void {
    if (!this.enabled) return;

    // Try to play file first
    if (this.sounds[type]) {
      const sound = this.sounds[type];
      sound.currentTime = 0;
      sound.play().catch(() => this.playSynthesizedSound(type));
    } else {
      this.playSynthesizedSound(type);
    }
  }

  private playSynthesizedSound(type: string): void {
    if (!this.audioContext) return;

    const ctx = this.audioContext;
    const now = ctx.currentTime;

    switch (type) {
      case 'scan':
        this.beep(800, 0.1, 'sine');
        break;
      
      case 'success':
        // Ascending major triad
        this.beep(523.25, 0.1, 'triangle', now);       // C5
        this.beep(659.25, 0.1, 'triangle', now + 0.1); // E5
        this.beep(783.99, 0.2, 'triangle', now + 0.2); // G5
        break;
      
      case 'error':
        // Low buzz
        this.beep(150, 0.3, 'sawtooth');
        break;
      
      case 'levelUp':
        // Fanfare
        this.playMelody([
          { freq: 523.25, dur: 0.1, time: 0 },
          { freq: 659.25, dur: 0.1, time: 0.1 },
          { freq: 783.99, dur: 0.1, time: 0.2 },
          { freq: 1046.50, dur: 0.4, time: 0.3 }
        ]);
        break;
      
      case 'achievement':
        // Twinkle sound
        this.playMelody([
          { freq: 987.77, dur: 0.1, time: 0 },
          { freq: 1318.51, dur: 0.1, time: 0.1 },
          { freq: 1567.98, dur: 0.2, time: 0.2 }
        ]);
        break;
      
      case 'coin':
        // High ping
        this.beep(1200, 0.05, 'sine', now);
        this.beep(1600, 0.1, 'sine', now + 0.05);
        break;
      
      case 'click':
        this.beep(400, 0.05, 'sine');
        break;

      case 'purchase':
        // Cash register sound simulation
        this.playCashRegister();
        break;
    }
  }

  private beep(freq: number, duration: number, type: OscillatorType = 'sine', startTime?: number): void {
    if (!this.audioContext) return;
    
    const ctx = this.audioContext;
    const start = startTime || ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, start);
    
    gain.gain.setValueAtTime(0.1, start);
    gain.gain.exponentialRampToValueAtTime(0.01, start + duration);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(start);
    osc.stop(start + duration);
  }

  private playMelody(notes: { freq: number, dur: number, time: number }[]): void {
    if (!this.audioContext) return;
    const now = this.audioContext.currentTime;
    notes.forEach(note => this.beep(note.freq, note.dur, 'square', now + note.time));
  }

  private playCashRegister(): void {
    if (!this.audioContext) return;
    const ctx = this.audioContext;
    const now = ctx.currentTime;

    // Cha-ching!
    this.beep(2000, 0.1, 'square', now);
    this.beep(2000, 0.1, 'square', now + 0.1);
    this.beep(4000, 0.4, 'sine', now + 0.2);
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

