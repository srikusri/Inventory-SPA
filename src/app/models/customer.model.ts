import { OrderItem } from './game.model';

export interface Customer {
    id: string;
    name: string;
    avatar: string; // Emoji or image path
    order: Order;
    patience: number; // 0-100
    maxPatience: number; // Time in seconds
    joinedAt: Date;
    status: 'waiting' | 'served' | 'left';
}

export interface Order {
    id: string;
    items: OrderItem[];
    total: number;
    reward: number; // Coins earned
}

export const CUSTOMER_NAMES = [
    'Alice', 'Bob', 'Charlie', 'Daisy', 'Evan', 'Fiona', 'George', 'Hannah',
    'Ian', 'Julia', 'Kevin', 'Luna', 'Max', 'Nora', 'Oliver', 'Penny'
];

export const CUSTOMER_AVATARS = [
    '👦', '👧', '👨', '👩', '👴', '👵', '👱', '👱‍♀️', '👮', '👮‍♀️', '🧙', '🧚'
];
