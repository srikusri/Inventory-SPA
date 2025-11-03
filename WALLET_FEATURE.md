# 💰 Wallet Feature Documentation

## Overview
The Wallet Feature adds a dual-persona payment system to the My Shop Game, enabling players to choose between being a **Seller** or **Buyer** and conduct real-time QR code-based transactions.

---

## 🎭 Features

### 1. Persona Selection
- **First-time Experience**: Players are greeted with a beautiful persona selection screen
- **Two Personas**:
  - **🏪 Seller**: Manage inventory, sell products, and receive payments
  - **🛍️ Buyer**: Shop for items and pay using wallet QR code scanning

### 2. Wallet System
- **Balance Management**: Both personas have digital wallets
- **Starting Balance**:
  - Sellers start with $0
  - Buyers start with $100 welcome bonus
- **Load Money**: Quick-add buttons ($10, $20, $50, $100) and custom amount input
- **Transaction History**: Complete record of all wallet activities

### 3. QR Code Payment Flow

#### For Sellers:
1. Add items to cart during checkout
2. Click "Complete Sale"
3. QR code is automatically generated with payment details
4. Wait for buyer to scan and pay
5. Money is automatically added to seller's wallet
6. Sale completes and inventory updates

#### For Buyers:
1. Click "Scan to Pay" button
2. Camera opens to scan seller's QR code
3. Payment details are displayed for confirmation
4. Verify balance is sufficient
5. Confirm payment
6. Money is deducted and sent to seller
7. Transaction recorded in history

---

## 🏗️ Architecture

### Models
**`wallet.model.ts`**
- `PersonaType`: Enum for SELLER/BUYER
- `Wallet`: Balance and transaction list
- `WalletTransaction`: Individual transaction record
- `PaymentRequest`: QR code payment data structure
- `Persona`: User profile with wallet

### Services
**`wallet.service.ts`**
- `createPersona()`: Initialize new persona
- `loadMoney()`: Add funds to wallet
- `createPaymentRequest()`: Generate payment request for QR
- `processPayment()`: Handle buyer payment
- `checkAndCompletePayment()`: Seller checks for received payment
- `switchPersona()`: Reset and choose new persona

### Components

**`persona-selection.component.ts`**
- Beautiful onboarding screen
- Persona type selection
- Name input
- Feature highlights for each persona

**`wallet-display.component.ts`**
- Compact wallet button in header
- Shows current balance
- Modal with full wallet details
- Load money interface
- Transaction history
- Switch persona option

**`qr-payment.component.ts`** (Seller)
- Generates QR code with payment details
- Real-time payment status checking
- Success animation when payment received
- Cancel option

**`qr-scanner-payment.component.ts`** (Buyer)
- Camera-based QR code scanning
- Payment confirmation screen
- Balance verification
- Insufficient funds warning
- Success animation

---

## 🔄 Payment Flow Diagram

```
SELLER                          BUYER
  │                               │
  ├─ Add items to cart            │
  ├─ Click "Complete Sale"        │
  ├─ Generate QR Code             │
  │   (contains payment details)  │
  │                               │
  │                               ├─ Click "Scan to Pay"
  │                               ├─ Open Camera
  │    ← ← ← Scan QR Code ← ← ←  │
  │                               ├─ View Payment Details
  │                               ├─ Confirm Payment
  │                               ├─ Deduct from Wallet
  │                               ├─ Update Payment Request
  ├─ Check Payment Status         │     (mark as completed)
  ├─ Detect Completed Payment     │
  ├─ Credit to Wallet             │
  ├─ Complete Sale                │
  ├─ Update Inventory             │
  └─ Show Success                 └─ Show Success
```

---

## 💾 Data Storage

### LocalStorage Keys
- `kids_wallet_persona`: Current persona data
- `kids_payment_request`: Active payment request (QR data)
- Existing: `kids_store_name`, `kids_inventory`, `kids_sales_history`

### Data Persistence
- Persona and wallet data persist across sessions
- Transaction history maintained per persona
- Switching personas clears current wallet data

---

## 🎨 UI/UX Highlights

### Animations
- Fade-in overlay for modals
- Slide-up modal entrance
- Bounce effect for success icons
- Pulse animation for scan instructions
- Rotating settings gear icon

### Color Scheme
- **Seller**: Green gradient (#56ab2f → #a8e063)
- **Buyer**: Pink gradient (#FF6B9D → #C44569)
- **Success**: Green (#56ab2f)
- **Error**: Red (#ff6b6b)
- **Warning**: Yellow (#ffc107)

### Mobile Optimizations
- Touch-friendly button sizes (min 48px)
- Responsive grid layouts
- Full-screen camera scanner
- Readable fonts and spacing
- Compact wallet button in header

---

## 🔐 Security Considerations

### Current Implementation
- Client-side only (localStorage)
- No real money transactions
- Educational/game purposes only
- Payment requests cleared after use

### Future Enhancements (Production)
- Backend API for transaction validation
- User authentication
- Encrypted payment data
- Transaction logging
- Real payment gateway integration
- Multi-device synchronization

---

## 📱 Testing Guide

### Test Scenario 1: Seller Flow
1. **Clear localStorage** to start fresh
2. Select **Seller** persona, enter name
3. Add inventory items (scan or manual entry)
4. Switch to "Sell Items" mode
5. Scan items to add to cart
6. Click "Checkout" → "Complete Sale"
7. QR code appears → Leave it open
8. (Open app in another device as buyer to complete test)

### Test Scenario 2: Buyer Flow
1. Select **Buyer** persona, enter name
2. Click "Scan to Pay" button
3. Point camera at seller's QR code
4. Confirm payment details
5. Click "Pay" button
6. Verify success message
7. Check wallet balance decreased

### Test Scenario 3: Two Devices
**Device 1 (Seller)**:
- Complete sale, show QR code

**Device 2 (Buyer)**:
- Scan seller's QR code
- Complete payment

**Device 1 (Seller)**:
- Automatically detects payment
- Shows success, completes sale

### Test Scenario 4: Edge Cases
- Insufficient buyer funds
- Cancel payment
- Invalid QR code scan
- Camera permissions denied
- Switch persona and verify data reset
- Load custom amounts
- View transaction history

---

## 🚀 Integration Points

### Modified Files
- `app.component.ts`: Added persona/wallet imports and QR scanner
- `app.component.html`: Persona-based UI, wallet display, buyer view
- `app.component.scss`: Buyer view styles, persona badges
- `sales.component.ts`: QR payment integration for sellers
- `sales.component.html`: QR payment component added

### New Files
- `src/app/models/wallet.model.ts`
- `src/app/services/wallet.service.ts`
- `src/app/components/persona-selection/`
- `src/app/components/wallet-display/`
- `src/app/components/qr-payment/`
- `src/app/components/qr-scanner-payment/`

---

## 🎯 Future Enhancements

1. **Multi-Seller Support**: Buyers can pay multiple different sellers
2. **Transaction Receipts**: PDF/email receipts
3. **Spending Limits**: Parental controls for buyer spending
4. **Savings Goals**: Encourage saving with visual goals
5. **Rewards Program**: Cashback/loyalty points
6. **Buddy Payments**: Split payments between buyers
7. **Monthly Statements**: Transaction summary reports
8. **Export Data**: CSV/PDF export of transactions
9. **Currency Support**: Multiple currencies
10. **Dark Mode**: Theme support for personas

---

## 📞 Support & Troubleshooting

### Common Issues

**QR Code not scanning?**
- Ensure camera permissions granted
- Try better lighting
- Move camera closer/farther from QR code
- Check browser supports camera API (HTTPS required for production)

**Payment not completing?**
- Verify buyer has sufficient balance
- Check both devices are using same base URL
- Confirm payment request is still active (not expired/cancelled)
- Clear localStorage and retry

**Wallet balance incorrect?**
- Check transaction history for discrepancies
- Verify no duplicate transactions
- Clear cache and reload

**Can't switch persona?**
- Click wallet → "Switch Persona" button
- Confirm the action (data will be cleared)

---

## 🎓 Educational Value

### Learning Outcomes
- **Financial Literacy**: Understanding wallets, balances, transactions
- **Digital Payments**: How QR code payments work
- **Budget Management**: Tracking income and expenses
- **Responsibility**: Managing money carefully
- **Technology**: Camera, QR codes, digital transactions
- **Business Skills**: Seller role teaches inventory and sales

### Age Appropriateness
- **Recommended**: Ages 8+
- **Parental Guidance**: Supervise initial setup and gameplay
- **Learning Mode**: Emphasize that this is practice, not real money

---

## 🏁 Conclusion

The Wallet Feature transforms My Shop Game into a complete economic simulation, teaching kids about money management, digital payments, and business operations in a fun, interactive way!

**Ready to play?** Choose your persona and start your shop adventure! 🎉

