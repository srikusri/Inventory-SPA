import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';
import { InventoryService } from '../../services/inventory.service';
import { GameService } from '../../services/game.service';
import { SoundService } from '../../services/sound.service';
import { ToastService } from '../../services/toast.service';
import { ToastComponent } from '../toast/toast.component';
import { InventoryItem } from '../../models/inventory-item.model';

@Component({
  selector: 'app-inventory-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ZXingScannerModule,
    ToastComponent
  ],
  templateUrl: './inventory-management.component.html',
  styleUrls: ['./inventory-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InventoryManagementComponent {
  scanning = signal(false);
  showItemModal = signal(false);
  scannedBarcode = signal('');
  
  itemName = signal('');
  itemPrice = signal(0);
  itemQuantity = signal(1);
  editMode = signal(false);
  currentItemId = signal<string | null>(null);

  hasDevices = signal(false);
  hasPermission = signal(false);

  // Barcode formats to scan
  barcodeFormats = [
    BarcodeFormat.QR_CODE,
    BarcodeFormat.EAN_13,
    BarcodeFormat.CODE_128,
    BarcodeFormat.CODE_39,
    BarcodeFormat.EAN_8,
    BarcodeFormat.UPC_A,
    BarcodeFormat.UPC_E
  ];

  tableColumns = [
    { field: 'barcode', header: 'Barcode', sortable: true },
    { field: 'name', header: 'Name', sortable: true },
    { field: 'price', header: 'Price', sortable: true },
    { field: 'quantity', header: 'Quantity', sortable: true },
    { field: 'actions', header: 'Actions', sortable: false }
  ];

  constructor(
    public inventoryService: InventoryService,
    private toastService: ToastService,
    private gameService: GameService,
    private soundService: SoundService
  ) {}

  startScanning(): void {
    this.scanning.set(true);
  }

  stopScanning(): void {
    this.scanning.set(false);
  }

  onScanSuccess(barcode: string): void {
    this.scannedBarcode.set(barcode);
    this.stopScanning();
    
    // Game events
    this.gameService.onItemScanned();
    this.soundService.playSound('scan');

    const existingItem = this.inventoryService.getItemByBarcode(barcode);

    if (existingItem) {
      // Edit existing item
      this.editMode.set(true);
      this.currentItemId.set(existingItem.id);
      this.itemName.set(existingItem.name);
      this.itemPrice.set(existingItem.price);
      this.itemQuantity.set(existingItem.quantity);
      this.showToast('🎉 Item found! You can edit it!', 'info');
    } else {
      // Add new item
      this.editMode.set(false);
      this.currentItemId.set(null);
      this.itemName.set('');
      this.itemPrice.set(0);
      this.itemQuantity.set(1);
      this.showToast('✨ New item! Let\'s add it to your store!', 'success');
    }

    this.showItemModal.set(true);
  }

  onScanError(error: Error): void {
    console.error('Scan error:', error);
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.hasDevices.set(devices && devices.length > 0);
  }

  onPermissionResponse(hasPermission: boolean): void {
    this.hasPermission.set(hasPermission);
  }

  manualBarcodeEntry(): void {
    const barcode = prompt('Enter barcode manually:');
    if (barcode) {
      this.onScanSuccess(barcode);
    }
  }

  saveItem(): void {
    const barcode = this.scannedBarcode();
    const name = this.itemName();
    const price = this.itemPrice();
    const quantity = this.itemQuantity();

    if (!name || price <= 0 || quantity <= 0) {
      this.soundService.playSound('error');
      this.showToast('🤔 Oops! Please fill all the fields correctly!', 'error');
      return;
    }

    if (this.editMode()) {
      const id = this.currentItemId();
      if (id) {
        this.inventoryService.updateItem(id, { name, price, quantity });
        this.soundService.playSound('success');
        this.showToast('🎊 Item updated! Great job!', 'success');
      }
    } else {
      this.inventoryService.addItem(barcode, name, price, quantity);
      this.gameService.onItemAdded();
      this.soundService.playSound('success');
      
      const leveledUp = this.checkLevelUp();
      if (!leveledUp) {
        this.showToast('🌟 Item added! You earned points!', 'success');
      }
    }

    this.closeModal();
  }

  private checkLevelUp(): boolean {
    // The game service already handles level up, just check if it happened
    // This is a placeholder for showing level up celebration
    return false;
  }

  editItem(item: InventoryItem): void {
    this.scannedBarcode.set(item.barcode);
    this.editMode.set(true);
    this.currentItemId.set(item.id);
    this.itemName.set(item.name);
    this.itemPrice.set(item.price);
    this.itemQuantity.set(item.quantity);
    this.showItemModal.set(true);
  }

  deleteItem(item: InventoryItem): void {
    if (confirm(`Are you sure you want to delete "${item.name}"?`)) {
      this.inventoryService.deleteItem(item.id);
      this.showToast('Item deleted successfully!', 'success');
    }
  }

  closeModal(): void {
    this.showItemModal.set(false);
    this.resetForm();
  }

  private resetForm(): void {
    this.scannedBarcode.set('');
    this.itemName.set('');
    this.itemPrice.set(0);
    this.itemQuantity.set(1);
    this.editMode.set(false);
    this.currentItemId.set(null);
  }

  private showToast(message: string, severity: 'success' | 'info' | 'warn' | 'error'): void {
    this.toastService.add({
      severity,
      summary: severity === 'error' ? 'Error' : severity === 'success' ? 'Success' : 'Info',
      detail: message,
      life: 3000
    });
  }
}

