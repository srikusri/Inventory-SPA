# 🎨 Customization Guide

This guide will help you customize the Inventory Manager SPA to match your brand and requirements.

## Color Schemes

### Changing Primary Colors

Edit `src/styles.scss` and update the color variables:

```scss
// Add at the top of the file
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --success-color: #28a745;
  --danger-color: #dc3545;
  --info-color: #17a2b8;
  --warning-color: #ffc107;
}
```

Then use these variables throughout your styles:
```scss
background: var(--primary-color);
```

### Gradient Customization

Update gradients in component SCSS files:

**Inventory Stats Card** (`inventory-management.component.scss`):
```scss
.stat-card {
  background: linear-gradient(135deg, #YOUR_COLOR1 0%, #YOUR_COLOR2 100%);
}
```

**Sales Stats Cards** (`sales.component.scss`):
```scss
.stat-card.cart {
  background: linear-gradient(135deg, #YOUR_COLOR1 0%, #YOUR_COLOR2 100%);
}
```

## Branding

### Application Name

**In Header** (`app.component.html`):
```html
<h1>🏪 Your Store Name</h1>
```

**In Page Title** (`index.html`):
```html
<title>Your Store Name - Inventory Manager</title>
```

**In Footer** (`app.component.html`):
```html
<p>&copy; 2025 Your Store Name - Your Tagline</p>
```

### Logo

Replace the emoji with your logo:

1. Add your logo to `src/assets/logo.png`
2. Update `app.component.html`:
```html
<div class="logo">
  <img src="assets/logo.png" alt="Logo" />
  <h1>Your Store Name</h1>
</div>
```

3. Add CSS in `app.component.scss`:
```scss
.logo {
  img {
    height: 40px;
    width: auto;
  }
}
```

## Currency Customization

### Change Currency Symbol

Search for all instances of `$` and replace with your currency:

**Example for Euro (€)**:
```typescript
// In component templates
${{ item.price.toFixed(2) }}  // Change to
€{{ item.price.toFixed(2) }}
```

Or create a pipe for currency formatting:

```typescript
// src/app/pipes/currency.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customCurrency',
  standalone: true
})
export class CustomCurrencyPipe implements PipeTransform {
  transform(value: number, symbol: string = '€'): string {
    return `${symbol}${value.toFixed(2)}`;
  }
}
```

Then use in templates:
```html
{{ item.price | customCurrency }}
```

## Layout Customization

### Max Width

Change container max width in component SCSS files:

```scss
.inventory-container {
  max-width: 1600px; // Change from 1400px
  margin: 0 auto;
}
```

### Padding & Spacing

Adjust spacing throughout:

```scss
.inventory-container {
  padding: 3rem; // Increase from 2rem
}
```

### Font Sizes

Update typography in `src/styles.scss`:

```scss
html, body {
  font-size: 18px; // Increase base font size
}
```

## Feature Customization

### Low Stock Threshold

Change when items show as "low stock":

In `inventory-management.component.html`:
```html
<span class="quantity-badge" [class.low-stock]="item.quantity < 10">
  {{ item.quantity }}
</span>
```

### Default Quantity

Change default item quantity when adding:

In `inventory-management.component.ts`:
```typescript
itemQuantity = signal(10); // Change from 1
```

### Scan Quantity Default

Change default quantity when scanning for sales:

In `sales.component.ts`:
```typescript
scanQuantity = signal(2); // Change from 1
```

## Barcode Format Support

Enable/disable specific barcode formats:

In both component templates, update the scanner:

```html
<zxing-scanner
  [formats]="['QR_CODE', 'EAN_13', 'CODE_128']">
  <!-- Remove formats you don't need -->
</zxing-scanner>
```

Available formats:
- `QR_CODE`
- `EAN_13`
- `CODE_128`
- `CODE_39`
- `EAN_8`
- `UPC_A`
- `UPC_E`

## Table Columns

### Add Custom Columns

In `inventory-management.component.ts`:

```typescript
tableColumns = [
  { field: 'barcode', header: 'Barcode', sortable: true },
  { field: 'name', header: 'Name', sortable: true },
  { field: 'price', header: 'Price', sortable: true },
  { field: 'quantity', header: 'Quantity', sortable: true },
  { field: 'category', header: 'Category', sortable: true }, // New!
  { field: 'actions', header: 'Actions', sortable: false }
];
```

Then update the model in `inventory-item.model.ts`:

```typescript
export interface InventoryItem {
  id: string;
  barcode: string;
  name: string;
  price: number;
  quantity: number;
  category?: string; // Add optional field
  createdAt: Date;
  updatedAt: Date;
}
```

## Toast Notification Duration

Change how long notifications display:

In component TypeScript files, update `showToast`:

```typescript
this.messageService.add({
  severity,
  summary: 'Success',
  detail: message,
  life: 5000 // Change from 3000 (5 seconds instead of 3)
});
```

## Animations

### Disable Animations

Remove animation classes from components or update `styles.scss`:

```scss
// Disable specific animation
@keyframes fadeIn {
  from, to { opacity: 1; } // Always visible
}
```

### Adjust Animation Speed

Update animation durations:

```scss
.modal-overlay {
  animation: fadeIn 0.5s; // Slower (was 0.2s)
}
```

## Mode Names

Rename "Inventory" and "Sales" modes:

In `app.component.html`:

```html
<button adapt-button ...>
  📦 Stock Management  <!-- Was "Inventory" -->
</button>
<button adapt-button ...>
  💰 Point of Sale  <!-- Was "Sales" -->
</button>
```

## Icons

Replace emoji icons with icon font:

1. Install icon library (e.g., Font Awesome):
```bash
npm install @fortawesome/fontawesome-free
```

2. Import in `styles.scss`:
```scss
@import '@fortawesome/fontawesome-free/css/all.css';
```

3. Replace emojis in templates:
```html
<!-- Before -->
<i class="icon-camera"></i>

<!-- After -->
<i class="fas fa-camera"></i>
```

## Receipt Customization

Edit receipt content in `sales.component.html`:

```html
<div class="receipt">
  <img src="assets/logo.png" alt="Logo" />
  <h3>Your Store Name</h3>
  <p>123 Main Street, City</p>
  <p>Phone: (555) 123-4567</p>
  <hr />
  <!-- Rest of receipt -->
</div>
```

## Language/Localization

For multi-language support, consider using Angular i18n:

```html
<!-- Example -->
<h1 i18n="@@appTitle">Inventory Manager</h1>
```

Then extract and translate:
```bash
ng extract-i18n
```

## Additional Fields

### Add Notes/Description Field

1. Update model:
```typescript
export interface InventoryItem {
  // ... existing fields
  notes?: string;
}
```

2. Add to form in component template:
```html
<div class="form-group">
  <label for="itemNotes">Notes</label>
  <textarea
    id="itemNotes"
    class="form-input"
    [(ngModel)]="itemNotes"
    placeholder="Additional notes"></textarea>
</div>
```

3. Update save logic in component

## Performance Tuning

### Pagination

Add pagination to inventory table for large datasets:

```html
<div class="pagination">
  <button (click)="previousPage()">Previous</button>
  <span>Page {{ currentPage }} of {{ totalPages }}</span>
  <button (click)="nextPage()">Next</button>
</div>
```

### Virtual Scrolling

For very large lists, implement virtual scrolling using Angular CDK.

---

**Need more customization help? Check Angular documentation or create an issue!**

