import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../services/customer.service';
import { CurrencyFormatPipe } from '../../pipes/currency-format.pipe';

@Component({
    selector: 'app-customer-queue',
    standalone: true,
    imports: [CommonModule, CurrencyFormatPipe],
    template: `
    <div class="queue-container" *ngIf="customerService.customers().length > 0">
      <h3>👥 Waiting Customers</h3>
      
      <div class="customers-list">
        <div class="customer-card" *ngFor="let customer of customerService.customers()">
          <div class="customer-header">
            <div class="avatar">{{ customer.avatar }}</div>
            <div class="info">
              <div class="name">{{ customer.name }}</div>
              <div class="patience-bar">
                <div class="fill" 
                     [style.width.%]="customer.patience"
                     [class.critical]="customer.patience < 30">
                </div>
              </div>
            </div>
          </div>

          <div class="order-details">
            <div class="order-item" *ngFor="let item of customer.order.items">
              <span>{{ item.quantity }}x {{ item.name }}</span>
            </div>
            <div class="total">Reward: {{ customer.order.reward | currencyFormat }}</div>
          </div>

          <div class="actions">
            <button class="btn-serve" (click)="customerService.serveCustomer(customer.id)">
              ✅ Serve
            </button>
            <button class="btn-dismiss" (click)="customerService.dismissCustomer(customer.id)">
              ❌
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .queue-container {
      background: white;
      border-radius: 12px;
      padding: 1rem;
      margin-bottom: 1rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    h3 {
      margin: 0 0 1rem 0;
      font-size: 1.1rem;
      color: #333;
    }

    .customers-list {
      display: flex;
      gap: 1rem;
      overflow-x: auto;
      padding-bottom: 0.5rem;
    }

    .customer-card {
      min-width: 200px;
      background: #f8f9fa;
      border-radius: 8px;
      padding: 0.75rem;
      border: 1px solid #dee2e6;
    }

    .customer-header {
      display: flex;
      gap: 0.75rem;
      margin-bottom: 0.75rem;
    }

    .avatar {
      font-size: 2rem;
    }

    .info {
      flex: 1;
    }

    .name {
      font-weight: 600;
      font-size: 0.9rem;
      margin-bottom: 0.25rem;
    }

    .patience-bar {
      height: 4px;
      background: #e9ecef;
      border-radius: 2px;
      overflow: hidden;
    }

    .fill {
      height: 100%;
      background: #28a745;
      transition: width 1s linear;
    }

    .fill.critical {
      background: #dc3545;
    }

    .order-details {
      font-size: 0.85rem;
      color: #666;
      margin-bottom: 0.75rem;
      padding: 0.5rem;
      background: white;
      border-radius: 4px;
    }

    .total {
      margin-top: 0.25rem;
      font-weight: 600;
      color: #28a745;
      text-align: right;
    }

    .actions {
      display: flex;
      gap: 0.5rem;
    }

    .btn-serve {
      flex: 1;
      background: #28a745;
      color: white;
      border: none;
      padding: 0.4rem;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 600;
    }

    .btn-dismiss {
      background: #dc3545;
      color: white;
      border: none;
      padding: 0.4rem 0.8rem;
      border-radius: 4px;
      cursor: pointer;
    }

    button:hover {
      opacity: 0.9;
    }
  `]
})
export class CustomerQueueComponent {
    constructor(public customerService: CustomerService) { }
}
