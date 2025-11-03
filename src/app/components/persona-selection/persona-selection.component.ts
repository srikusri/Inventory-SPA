import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WalletService } from '../../services/wallet.service';
import { PersonaType } from '../../models/wallet.model';

@Component({
  selector: 'app-persona-selection',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    @if (!walletService.hasPersona()) {
      <div class="persona-overlay">
        <div class="persona-modal">
          <div class="persona-header">
            <h1>👋 Welcome to My Shop Game!</h1>
            <p>Choose how you want to play</p>
          </div>

          <div class="persona-options">
            <button 
              class="persona-card" 
              [class.selected]="selectedType() === PersonaType.SELLER"
              (click)="selectPersona(PersonaType.SELLER)">
              <div class="persona-icon seller">🏪</div>
              <h2>I'm a Seller</h2>
              <p>Manage your store, scan items, and receive payments</p>
              <div class="persona-features">
                <span>📦 Add inventory</span>
                <span>💰 Sell products</span>
                <span>💳 Receive money</span>
              </div>
            </button>

            <button 
              class="persona-card" 
              [class.selected]="selectedType() === PersonaType.BUYER"
              (click)="selectPersona(PersonaType.BUYER)">
              <div class="persona-icon buyer">🛍️</div>
              <h2>I'm a Buyer</h2>
              <p>Shop for items and pay with your wallet</p>
              <div class="persona-features">
                <span>💵 Start with $100</span>
                <span>🛒 Buy products</span>
                <span>📱 Scan QR to pay</span>
              </div>
            </button>
          </div>

          @if (selectedType()) {
            <div class="name-input-section">
              <label>What's your name?</label>
              <input 
                type="text" 
                [(ngModel)]="personaName"
                [placeholder]="selectedType() === PersonaType.SELLER ? 'Store Owner Name' : 'Your Name'"
                maxlength="20"
                class="name-input"
                (keyup.enter)="confirmSelection()">
            </div>

            <button 
              class="btn btn-primary btn-large start-btn"
              (click)="confirmSelection()"
              [disabled]="!personaName().trim()">
              🚀 Start Playing as {{ selectedType() === PersonaType.SELLER ? 'Seller' : 'Buyer' }}
            </button>
          }
        </div>
      </div>
    }
  `,
  styles: [`
    .persona-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 3000;
      animation: fadeIn 0.3s;
    }

    .persona-modal {
      background: white;
      border-radius: 24px;
      width: 95%;
      max-width: 900px;
      padding: 3rem;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      animation: slideUp 0.5s;
    }

    .persona-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .persona-header h1 {
      font-size: 2.5rem;
      margin: 0 0 1rem 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .persona-header p {
      font-size: 1.25rem;
      color: #666;
      margin: 0;
    }

    .persona-options {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .persona-card {
      background: white;
      border: 3px solid #e0e0e0;
      border-radius: 20px;
      padding: 2rem;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .persona-card:hover {
      transform: translateY(-8px);
      border-color: #667eea;
      box-shadow: 0 12px 24px rgba(102, 126, 234, 0.2);
    }

    .persona-card.selected {
      border-color: #667eea;
      background: linear-gradient(135deg, #f5f7ff 0%, #e8ecff 100%);
      box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
    }

    .persona-icon {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 4rem;
      margin-bottom: 1.5rem;
      animation: bounce 2s infinite;
    }

    .persona-icon.seller {
      background: linear-gradient(135deg, #56ab2f 0%, #a8e063 100%);
    }

    .persona-icon.buyer {
      background: linear-gradient(135deg, #FF6B9D 0%, #C44569 100%);
    }

    .persona-card h2 {
      font-size: 1.75rem;
      margin: 0 0 1rem 0;
      color: #333;
    }

    .persona-card p {
      font-size: 1.125rem;
      color: #666;
      margin: 0 0 1.5rem 0;
    }

    .persona-features {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      width: 100%;
    }

    .persona-features span {
      padding: 0.75rem 1rem;
      background: white;
      border-radius: 12px;
      font-size: 1rem;
      font-weight: 500;
      color: #333;
    }

    .name-input-section {
      text-align: center;
      margin-bottom: 2rem;
    }

    .name-input-section label {
      display: block;
      font-size: 1.25rem;
      font-weight: 600;
      color: #333;
      margin-bottom: 1rem;
    }

    .name-input {
      width: 100%;
      max-width: 400px;
      padding: 1.25rem 1.5rem;
      font-size: 1.25rem;
      border: 3px solid #e0e0e0;
      border-radius: 16px;
      text-align: center;
      font-weight: 600;
      transition: all 0.3s;
    }

    .name-input:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
    }

    .start-btn {
      width: 100%;
      max-width: 400px;
      margin: 0 auto;
      display: block;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideUp {
      from {
        transform: translateY(30px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }

    @media (max-width: 768px) {
      .persona-modal {
        padding: 2rem 1.5rem;
      }

      .persona-header h1 {
        font-size: 2rem;
      }

      .persona-header p {
        font-size: 1rem;
      }

      .persona-options {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      .persona-icon {
        width: 100px;
        height: 100px;
        font-size: 3rem;
      }

      .persona-card h2 {
        font-size: 1.5rem;
      }

      .persona-card p {
        font-size: 1rem;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonaSelectionComponent {
  PersonaType = PersonaType;
  
  selectedType = signal<PersonaType | null>(null);
  personaName = signal('');

  constructor(public walletService: WalletService) {}

  selectPersona(type: PersonaType): void {
    this.selectedType.set(type);
    this.personaName.set('');
  }

  confirmSelection(): void {
    const type = this.selectedType();
    const name = this.personaName().trim();
    
    if (type && name) {
      this.walletService.createPersona(type, name);
    }
  }
}

