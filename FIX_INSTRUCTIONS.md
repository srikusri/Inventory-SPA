# Quick Fix Instructions

The app needs BMC UX components removed. Here's what to do:

## Files to Update:

### 1. All Component TypeScript Files
Replace:
```typescript
import { AdaptButtonModule, ... } from '@bmc-ux/adapt-angular';
```

With: Remove the import entirely

### 2. All Component HTML Files  
Replace:
```html
<button adapt-button type="primary">
```

With:
```html
<button class="btn btn-primary">
```

### 3. Toast/Messages
Replace `AdaptMessageService` with our new `ToastService`

## Quick Fix Command:

Run this to start with a simpler version without BMC components.
