export enum PersonaType {
  SELLER = 'seller',
  BUYER = 'buyer'
}

export interface Wallet {
  balance: number;
  transactions: WalletTransaction[];
}

export interface WalletTransaction {
  id: string;
  type: 'credit' | 'debit' | 'load';
  amount: number;
  description: string;
  timestamp: Date;
  fromPersona?: string;
  toPersona?: string;
}

export interface PaymentRequest {
  requestId: string;
  sellerId: string;
  sellerName: string;
  amount: number;
  saleId: string;
  timestamp: Date;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface Persona {
  id: string;
  type: PersonaType;
  name: string;
  wallet: Wallet;
  createdAt: Date;
}
