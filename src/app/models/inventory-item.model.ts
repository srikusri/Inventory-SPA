export interface InventoryItem {
  id: string;
  barcode: string;
  name: string;
  price: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  item: InventoryItem;
  quantity: number;
}

export interface Sale {
  id: string;
  items: CartItem[];
  total: number;
  timestamp: Date;
}

export enum AppMode {
  INVENTORY = 'inventory',
  SALES = 'sales'
}

