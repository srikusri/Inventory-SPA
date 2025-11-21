import { Injectable, signal, computed } from '@angular/core';
import { Customer, Order, CUSTOMER_NAMES, CUSTOMER_AVATARS } from '../models/customer.model';
import { InventoryService } from './inventory.service';
import { GameService } from './game.service';
import { SoundService } from './sound.service';
import { InventoryItem } from '../models/inventory-item.model';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    private customersSignal = signal<Customer[]>([]);
    customers = this.customersSignal.asReadonly();

    private queueTimer: any;
    private patienceTimer: any;
    private maxQueueSize = 3;
    private spawnRate = 10000; // New customer every 10 seconds

    constructor(
        private inventoryService: InventoryService,
        private gameService: GameService,
        private soundService: SoundService
    ) {
        this.startQueue();
    }

    private startQueue(): void {
        // Spawn customers
        this.queueTimer = setInterval(() => {
            if (this.customersSignal().length < this.maxQueueSize) {
                this.spawnCustomer();
            }
        }, this.spawnRate);

        // Decrease patience
        this.patienceTimer = setInterval(() => {
            this.updatePatience();
        }, 1000);
    }

    private spawnCustomer(): void {
        const inventory = this.inventoryService.inventory();
        if (inventory.length === 0) return; // Can't order if no items

        const customer: Customer = {
            id: this.generateId(),
            name: this.getRandomName(),
            avatar: this.getRandomAvatar(),
            order: this.generateOrder(inventory),
            patience: 100,
            maxPatience: 30, // 30 seconds
            joinedAt: new Date(),
            status: 'waiting'
        };

        this.customersSignal.update(current => [...current, customer]);
        this.soundService.playSound('click'); // Using click as a notification for now
    }

    private generateOrder(inventory: InventoryItem[]): Order {
        const numItems = Math.floor(Math.random() * 3) + 1; // 1-3 items
        const orderItems = [];
        let total = 0;

        for (let i = 0; i < numItems; i++) {
            const item = inventory[Math.floor(Math.random() * inventory.length)];
            const qty = Math.floor(Math.random() * 2) + 1; // 1-2 quantity

            orderItems.push({
                barcode: item.barcode,
                name: item.name,
                quantity: qty,
                price: item.price
            });

            total += item.price * qty;
        }

        return {
            id: this.generateId(),
            items: orderItems,
            total: total,
            reward: Math.floor(total * 0.1) + 10 // 10% + 10 coins bonus
        };
    }

    private updatePatience(): void {
        this.customersSignal.update(customers => {
            return customers.map(c => {
                if (c.status !== 'waiting') return c;

                const newPatience = c.patience - (100 / c.maxPatience);
                if (newPatience <= 0) {
                    this.soundService.playErrorSound();
                    return { ...c, patience: 0, status: 'left' as const };
                }
                return { ...c, patience: newPatience };
            }).filter(c => c.status !== 'left'); // Remove left customers
        });
    }

    serveCustomer(customerId: string): boolean {
        const customer = this.customersSignal().find(c => c.id === customerId);
        if (!customer || customer.status !== 'waiting') return false;

        // Verify inventory has items (simplified: assume player has them if they click serve)
        // In a real game, we'd check if the player has "scanned" these items or if they are in stock
        // For this simple version, we'll just complete the order

        this.gameService.addCoins(customer.order.reward, `Served ${customer.name}`);
        this.gameService.addExperience(20);
        this.soundService.playSuccessJingle();

        // Remove customer
        this.customersSignal.update(current => current.filter(c => c.id !== customerId));

        return true;
    }

    dismissCustomer(customerId: string): void {
        this.customersSignal.update(current => current.filter(c => c.id !== customerId));
    }

    private getRandomName(): string {
        return CUSTOMER_NAMES[Math.floor(Math.random() * CUSTOMER_NAMES.length)];
    }

    private getRandomAvatar(): string {
        return CUSTOMER_AVATARS[Math.floor(Math.random() * CUSTOMER_AVATARS.length)];
    }

    private generateId(): string {
        return Date.now().toString(36) + Math.random().toString(36).substring(2);
    }
}
