import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game.service';
import { SoundService } from '../../services/sound.service';

@Component({
  selector: 'app-game-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="game-header">
      <div class="player-info">
        <div class="avatar">
          <span class="avatar-emoji">👦</span>
          <div class="level-badge">{{ gameService.level() }}</div>
        </div>
        <div class="player-stats">
          <h3>Store Manager</h3>
          <div class="xp-bar">
            <div class="xp-fill" [style.width.%]="gameService.progressPercentage()"></div>
            <span class="xp-text">Level {{ gameService.level() }}</span>
          </div>
        </div>
      </div>

      <div class="game-stats">
        <div class="stat-item coins" (click)="playSound()">
          <span class="stat-icon">🪙</span>
          <span class="stat-value">{{ gameService.coins() }}</span>
        </div>
        <div class="stat-item score">
          <span class="stat-icon">⭐</span>
          <span class="stat-value">{{ gameService.score() }}</span>
        </div>
        <div class="stat-item streak">
          <span class="stat-icon">🔥</span>
          <span class="stat-value">{{ gameService.gameState().dailyStreak }}</span>
        </div>
      </div>

      <button class="sound-toggle" (click)="toggleSound()">
        <span *ngIf="gameService.soundEnabled()">🔊</span>
        <span *ngIf="!gameService.soundEnabled()">🔇</span>
      </button>
    </div>
  `,
  styles: [`
    .game-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.75rem 1.5rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      gap: 1.5rem;
    }

    .player-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .avatar {
      position: relative;
      width: 48px;
      height: 48px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid rgba(255, 255, 255, 0.5);
    }

    .avatar-emoji {
      font-size: 1.5rem;
    }

    .level-badge {
      position: absolute;
      bottom: -4px;
      right: -4px;
      background: #FFC312;
      color: #333;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 0.75rem;
      border: 2px solid white;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .player-stats {
      flex: 1;
    }

    .player-stats h3 {
      margin: 0 0 0.375rem 0;
      font-size: 0.875rem;
      font-weight: 600;
    }

    .xp-bar {
      width: 180px;
      height: 20px;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      position: relative;
      overflow: hidden;
      border: 2px solid rgba(255, 255, 255, 0.3);
    }

    .xp-fill {
      height: 100%;
      background: linear-gradient(90deg, #FFC312, #FFA502);
      transition: width 0.5s ease;
      border-radius: 8px;
    }

    .xp-text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 0.688rem;
      font-weight: 700;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    }

    .game-stats {
      display: flex;
      gap: 0.75rem;
    }

    .stat-item {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.5rem 0.875rem;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 16px;
      backdrop-filter: blur(10px);
      transition: transform 0.2s, background 0.2s;
      cursor: pointer;
    }

    .stat-item:hover {
      transform: scale(1.05);
      background: rgba(255, 255, 255, 0.3);
    }

    .stat-icon {
      font-size: 1.25rem;
      animation: bounce 2s infinite;
    }

    .stat-value {
      font-weight: 700;
      font-size: 1rem;
    }

    .sound-toggle {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      border: 2px solid rgba(255, 255, 255, 0.3);
      cursor: pointer;
      font-size: 1.25rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }

    .sound-toggle:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: scale(1.1);
    }

    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-3px); }
    }

    @media (max-width: 768px) {
      .game-header {
        flex-wrap: wrap;
        padding: 0.625rem 0.875rem;
        gap: 0.75rem;
      }

      .player-info {
        gap: 0.625rem;
      }

      .avatar {
        width: 42px;
        height: 42px;
      }

      .avatar-emoji {
        font-size: 1.25rem;
      }

      .level-badge {
        width: 22px;
        height: 22px;
        font-size: 0.688rem;
      }

      .player-stats h3 {
        font-size: 0.813rem;
      }

      .xp-bar {
        width: 140px;
        height: 18px;
      }

      .xp-text {
        font-size: 0.625rem;
      }

      .game-stats {
        order: 3;
        width: 100%;
        justify-content: space-around;
        gap: 0.5rem;
      }

      .stat-item {
        padding: 0.375rem 0.75rem;
        flex: 1;
        justify-content: center;
      }

      .stat-icon {
        font-size: 1.125rem;
      }

      .stat-value {
        font-size: 0.938rem;
      }

      .sound-toggle {
        width: 38px;
        height: 38px;
        font-size: 1.125rem;
      }
    }

    @media (max-width: 480px) {
      .game-header {
        padding: 0.5rem 0.75rem;
      }

      .player-stats h3 {
        font-size: 0.75rem;
      }

      .xp-bar {
        width: 120px;
        height: 16px;
      }

      .stat-item {
        padding: 0.313rem 0.625rem;
      }

      .stat-icon {
        font-size: 1rem;
      }

      .stat-value {
        font-size: 0.875rem;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameHeaderComponent {
  constructor(
    public gameService: GameService,
    private soundService: SoundService
  ) {}

  toggleSound(): void {
    this.gameService.toggleSound();
    this.soundService.setEnabled(this.gameService.soundEnabled());
    this.soundService.playSound('click');
  }

  playSound(): void {
    this.soundService.playSound('coin');
  }
}

