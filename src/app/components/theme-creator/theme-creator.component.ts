import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameService } from '../../services/game.service';
import { SoundService } from '../../services/sound.service';
import { StoreTheme } from '../../models/game.model';

@Component({
    selector: 'app-theme-creator',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="theme-creator-container">
      <div class="header">
        <h2>🎨 Design Studio</h2>
        <p>Create your own custom store theme!</p>
      </div>

      <div class="creator-layout">
        <div class="controls-panel">
          <div class="input-group">
            <label>Theme Name</label>
            <input type="text" [(ngModel)]="themeName" placeholder="My Cool Theme" maxlength="20">
          </div>

          <div class="color-pickers">
            <div class="color-control">
              <label>Primary Color</label>
              <div class="color-input-wrapper">
                <input type="color" [(ngModel)]="primaryColor">
                <span class="color-value">{{ primaryColor }}</span>
              </div>
              <p class="help-text">Used for headers and main buttons</p>
            </div>

            <div class="color-control">
              <label>Secondary Color</label>
              <div class="color-input-wrapper">
                <input type="color" [(ngModel)]="secondaryColor">
                <span class="color-value">{{ secondaryColor }}</span>
              </div>
              <p class="help-text">Used for gradients and accents</p>
            </div>

            <div class="color-control">
              <label>Accent Color</label>
              <div class="color-input-wrapper">
                <input type="color" [(ngModel)]="accentColor">
                <span class="color-value">{{ accentColor }}</span>
              </div>
              <p class="help-text">Used for badges and highlights</p>
            </div>
          </div>

          <div class="actions">
            <button class="btn-save" (click)="saveTheme()" [disabled]="!themeName.trim()">
              💾 Save Theme
            </button>
          </div>
        </div>

        <div class="preview-panel">
          <h3>Live Preview</h3>
          <div class="preview-card" [style.background]="'linear-gradient(135deg, ' + primaryColor + ' 0%, ' + secondaryColor + ' 100%)'">
            <div class="preview-header">
              <span class="preview-title">{{ themeName || 'Your Theme' }}</span>
              <span class="preview-badge" [style.background]="accentColor">New!</span>
            </div>
            <div class="preview-content">
              <div class="preview-button" [style.background]="primaryColor">Button</div>
              <div class="preview-button secondary" [style.background]="secondaryColor">Secondary</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .theme-creator-container {
      padding: 2rem;
      background: white;
      border-radius: 16px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
      max-width: 900px;
      margin: 0 auto;
    }

    .header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .header h2 {
      font-size: 2rem;
      margin-bottom: 0.5rem;
      color: #2d3436;
    }

    .creator-layout {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
    }

    .input-group {
      margin-bottom: 2rem;
    }

    .input-group label {
      display: block;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: #2d3436;
    }

    .input-group input {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #dfe6e9;
      border-radius: 8px;
      font-size: 1rem;
      transition: border-color 0.2s;
    }

    .input-group input:focus {
      border-color: #6c5ce7;
      outline: none;
    }

    .color-control {
      margin-bottom: 1.5rem;
    }

    .color-control label {
      display: block;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: #2d3436;
    }

    .color-input-wrapper {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    input[type="color"] {
      width: 60px;
      height: 40px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      padding: 0;
      background: none;
    }

    .color-value {
      font-family: monospace;
      color: #636e72;
    }

    .help-text {
      font-size: 0.8rem;
      color: #b2bec3;
      margin-top: 0.25rem;
    }

    .btn-save {
      width: 100%;
      padding: 1rem;
      background: #00b894;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1.1rem;
      font-weight: 700;
      cursor: pointer;
      transition: transform 0.2s, background 0.2s;
    }

    .btn-save:hover:not(:disabled) {
      transform: translateY(-2px);
      background: #00a884;
    }

    .btn-save:disabled {
      background: #b2bec3;
      cursor: not-allowed;
    }

    .preview-panel h3 {
      margin-bottom: 1rem;
      color: #2d3436;
    }

    .preview-card {
      padding: 2rem;
      border-radius: 16px;
      color: white;
      box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    }

    .preview-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .preview-title {
      font-size: 1.5rem;
      font-weight: 700;
    }

    .preview-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 700;
      color: #2d3436;
    }

    .preview-content {
      display: flex;
      gap: 1rem;
    }

    .preview-button {
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-weight: 600;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }

    @media (max-width: 768px) {
      .creator-layout {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
    }
  `]
})
export class ThemeCreatorComponent {
    themeName = '';
    primaryColor = '#6c5ce7';
    secondaryColor = '#a29bfe';
    accentColor = '#ffeaa7';

    constructor(
        private gameService: GameService,
        private soundService: SoundService
    ) { }

    saveTheme(): void {
        if (!this.themeName.trim()) return;

        const newTheme: StoreTheme = {
            id: 'custom_' + Date.now(),
            name: this.themeName,
            icon: '🎨',
            unlocked: true,
            cost: 0,
            colors: {
                primary: this.primaryColor,
                secondary: this.secondaryColor,
                accent: this.accentColor
            }
        };

        this.gameService.addCustomTheme(newTheme);
        this.soundService.playSound('success');

        // Reset form
        this.themeName = '';
    }
}
