import { Component, Output, EventEmitter, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';
import { WalletService } from '../../services/wallet.service';
import { PaymentRequest, PersonaType } from '../../models/wallet.model';

@Component({
  selector: 'app-qr-scanner-payment',
  standalone: true,
  imports: [CommonModule, ZXingScannerModule],
  template: `
    @if (showScanner()) {
      <div class="scanner-overlay">
        <div class="scanner-modal">
          <div class="scanner-header">
            <h2>📱 Scan to Pay</h2>
            <button class="close-btn" (click)="close()">&times;</button>
          </div>

          <div class="scanner-body">
            @if (!paymentRequest() && !scanError()) {
              <div class="scanner-container">
                <zxing-scanner
                  [formats]="qrFormat"
                  [enable]="true"
                  (scanSuccess)="onScanSuccess($event)"
                  (scanError)="onScanError($event)"
                  (camerasFound)="onCamerasFound($event)">
                </zxing-scanner>
                <div class="scanner-overlay-border"></div>
              </div>

              <div class="scan-instructions">
                <div class="instruction-icon">🎯</div>
                <p>Point your camera at the seller's QR code</p>
              </div>
            }

            @if (paymentRequest()) {
              <div class="payment-confirmation">
                <div class="confirmation-icon">💳</div>
                <h3>Confirm Payment</h3>
                
                <div class="payment-details">
                  <div class="detail-row">
                    <span class="label">Pay to:</span>
                    <span class="value">{{ paymentRequest()!.sellerName }}</span>
                  </div>
                  <div class="detail-row amount-row">
                    <span class="label">Amount:</span>
                    <span class="value amount">\${{ paymentRequest()!.amount.toFixed(2) }}</span>
                  </div>
                  <div class="detail-row">
                    <span class="label">Your balance:</span>
                    <span class="value" [class.low-balance]="walletService.balance() < paymentRequest()!.amount">
                      \${{ walletService.balance().toFixed(2) }}
                    </span>
                  </div>
                </div>

                @if (walletService.balance() < paymentRequest()!.amount) {
                  <div class="insufficient-funds">
                    <div class="warning-icon">⚠️</div>
                    <p>Insufficient funds! You need \${{ (paymentRequest()!.amount - walletService.balance()).toFixed(2) }} more</p>
                  </div>
                } @else {
                  <button class="btn btn-success btn-large" (click)="confirmPayment()">
                    💰 Pay \${{ paymentRequest()!.amount.toFixed(2) }}
                  </button>
                }
              </div>
            }

            @if (scanError()) {
              <div class="error-message">
                <div class="error-icon">❌</div>
                <h3>Invalid QR Code</h3>
                <p>{{ scanError() }}</p>
                <button class="btn btn-primary" (click)="resetScanner()">Try Again</button>
              </div>
            }

            @if (paymentSuccess()) {
              <div class="success-animation">
                <div class="success-icon-large">✅</div>
                <h2>Payment Successful!</h2>
                <p class="success-amount">\${{ paidAmount().toFixed(2) }}</p>
                <p class="success-message">Transaction completed successfully</p>
              </div>
            }
          </div>

          <div class="scanner-footer">
            @if (!paymentSuccess()) {
              <button class="btn btn-secondary" (click)="close()">Cancel</button>
            }
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .scanner-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2500;
      animation: fadeIn 0.3s;
    }

    .scanner-modal {
      background: white;
      border-radius: 24px;
      width: 90%;
      max-width: 500px;
      max-height: 90vh;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
      animation: slideUp 0.4s;
    }

    .scanner-header {
      background: linear-gradient(135deg, #FF6B9D 0%, #C44569 100%);
      padding: 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .scanner-header h2 {
      margin: 0;
      color: white;
      font-size: 1.75rem;
    }

    .close-btn {
      background: none;
      border: none;
      color: white;
      font-size: 2rem;
      width: 40px;
      height: 40px;
      cursor: pointer;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;
    }

    .close-btn:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    .scanner-body {
      padding: 1.5rem;
      min-height: 400px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .scanner-container {
      position: relative;
      width: 100%;
      max-width: 400px;
      aspect-ratio: 1;
      border-radius: 16px;
      overflow: hidden;
      margin-bottom: 1.5rem;
    }

    .scanner-container ::ng-deep zxing-scanner {
      display: block;
      width: 100%;
      height: 100%;
    }

    .scanner-container ::ng-deep video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 16px;
    }

    .scanner-overlay-border {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 70%;
      height: 70%;
      border: 3px solid #FF6B9D;
      border-radius: 16px;
      pointer-events: none;
      box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
    }

    .scan-instructions {
      text-align: center;
    }

    .instruction-icon {
      font-size: 3rem;
      margin-bottom: 0.5rem;
      animation: pulse 2s infinite;
    }

    .scan-instructions p {
      font-size: 1.125rem;
      color: #666;
      margin: 0;
    }

    .payment-confirmation {
      width: 100%;
      text-align: center;
    }

    .confirmation-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
    }

    .payment-confirmation h3 {
      font-size: 1.75rem;
      margin: 0 0 2rem 0;
      color: #333;
    }

    .payment-details {
      background: #f8f9fa;
      border-radius: 16px;
      padding: 1.5rem;
      margin-bottom: 2rem;
    }

    .detail-row {
      display: flex;
      justify-content: space-between;
      padding: 0.75rem 0;
      border-bottom: 1px solid #e0e0e0;
    }

    .detail-row:last-child {
      border-bottom: none;
    }

    .detail-row.amount-row {
      margin: 0.5rem 0;
      padding: 1rem 0;
      border-top: 2px solid #e0e0e0;
      border-bottom: 2px solid #e0e0e0;
    }

    .detail-row .label {
      font-size: 1.125rem;
      color: #666;
    }

    .detail-row .value {
      font-size: 1.125rem;
      font-weight: 700;
      color: #333;
    }

    .detail-row .value.amount {
      font-size: 1.75rem;
      background: linear-gradient(135deg, #FF6B9D 0%, #C44569 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .detail-row .value.low-balance {
      color: #ff6b6b;
    }

    .insufficient-funds {
      background: #fff3cd;
      border: 2px solid #ffc107;
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }

    .warning-icon {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }

    .insufficient-funds p {
      margin: 0;
      color: #856404;
      font-weight: 600;
      font-size: 1.125rem;
    }

    .error-message {
      text-align: center;
      padding: 2rem;
    }

    .error-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
    }

    .error-message h3 {
      font-size: 1.5rem;
      color: #ff6b6b;
      margin: 0 0 0.5rem 0;
    }

    .error-message p {
      color: #666;
      margin: 0 0 1.5rem 0;
    }

    .success-animation {
      text-align: center;
      animation: successPop 0.5s;
    }

    .success-icon-large {
      font-size: 6rem;
      margin-bottom: 1rem;
      animation: bounce 0.6s;
    }

    .success-animation h2 {
      font-size: 2rem;
      color: #56ab2f;
      margin: 0 0 1rem 0;
    }

    .success-amount {
      font-size: 3rem;
      font-weight: 800;
      background: linear-gradient(135deg, #56ab2f 0%, #a8e063 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin: 0 0 0.5rem 0;
    }

    .success-message {
      color: #666;
      font-size: 1.125rem;
      margin: 0;
    }

    .scanner-footer {
      padding: 1.5rem;
      border-top: 2px solid #f0f0f0;
      text-align: center;
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

    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }

    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-20px); }
    }

    @keyframes successPop {
      0% {
        transform: scale(0.8);
        opacity: 0;
      }
      50% {
        transform: scale(1.05);
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }

    @media (max-width: 768px) {
      .scanner-modal {
        width: 95%;
      }

      .scanner-body {
        padding: 1rem;
      }

      .scanner-container {
        max-width: 100%;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QrScannerPaymentComponent {
  @Output() paymentCompleted = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  showScanner = signal(true);
  qrFormat = [BarcodeFormat.QR_CODE];
  paymentRequest = signal<PaymentRequest | null>(null);
  scanError = signal<string | null>(null);
  paymentSuccess = signal(false);
  paidAmount = signal(0);

  constructor(public walletService: WalletService) {
    // Check if user is a buyer
    if (this.walletService.persona()?.type !== PersonaType.BUYER) {
      this.scanError.set('Only buyers can scan and pay');
    }
  }

  onScanSuccess(qrCode: string): void {
    try {
      const data = JSON.parse(qrCode);
      
      if (data.type !== 'payment_request') {
        this.scanError.set('Invalid payment QR code');
        return;
      }

      // Reconstruct payment request
      const request: PaymentRequest = {
        requestId: data.requestId,
        sellerId: data.sellerId,
        sellerName: data.sellerName,
        amount: data.amount,
        saleId: data.saleId,
        timestamp: new Date(data.timestamp),
        status: 'pending'
      };

      this.paymentRequest.set(request);
    } catch (error) {
      this.scanError.set('Unable to read QR code. Please try again.');
    }
  }

  onScanError(error: Error): void {
    console.error('Scan error:', error);
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    if (devices.length === 0) {
      this.scanError.set('No camera found. Please enable camera access.');
    }
  }

  confirmPayment(): void {
    const request = this.paymentRequest();
    if (!request) return;

    const success = this.walletService.processPayment(request);
    
    if (success) {
      this.paidAmount.set(request.amount);
      this.paymentSuccess.set(true);
      
      // Auto-close after 3 seconds
      setTimeout(() => {
        this.paymentCompleted.emit();
        this.close();
      }, 3000);
    } else {
      this.scanError.set('Payment failed. Please check your balance.');
      this.paymentRequest.set(null);
    }
  }

  resetScanner(): void {
    this.scanError.set(null);
    this.paymentRequest.set(null);
  }

  close(): void {
    this.closed.emit();
    this.showScanner.set(false);
  }
}

