import { Injectable } from '@angular/core';
import { InventoryItem, Sale } from '../models/inventory-item.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly INVENTORY_KEY = 'inventory_items';
  private readonly SALES_KEY = 'sales_history';

  // Generic storage operations
  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  // Inventory operations
  getInventory(): InventoryItem[] {
    const data = localStorage.getItem(this.INVENTORY_KEY);
    return data ? JSON.parse(data) : [];
  }

  saveInventory(items: InventoryItem[]): void {
    localStorage.setItem(this.INVENTORY_KEY, JSON.stringify(items));
  }

  // Sales operations
  getSales(): Sale[] {
    const data = localStorage.getItem(this.SALES_KEY);
    return data ? JSON.parse(data) : [];
  }

  saveSale(sale: Sale): void {
    const sales = this.getSales();
    sales.push(sale);
    localStorage.setItem(this.SALES_KEY, JSON.stringify(sales));
  }

  clearInventory(): void {
    localStorage.removeItem(this.INVENTORY_KEY);
  }

  clearSales(): void {
    localStorage.removeItem(this.SALES_KEY);
  }
}

