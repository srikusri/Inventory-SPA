import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: number;
  severity: 'success' | 'info' | 'warn' | 'error';
  summary: string;
  detail: string;
  life?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts = signal<Toast[]>([]);
  private nextId = 1;

  getToasts = this.toasts.asReadonly();

  add(toast: Omit<Toast, 'id'>): void {
    const newToast: Toast = {
      ...toast,
      id: this.nextId++,
      life: toast.life || 3000
    };

    this.toasts.update(toasts => [...toasts, newToast]);

    // Auto remove after life duration
    setTimeout(() => {
      this.remove(newToast.id);
    }, newToast.life);
  }

  remove(id: number): void {
    this.toasts.update(toasts => toasts.filter(t => t.id !== id));
  }

  clear(): void {
    this.toasts.set([]);
  }
}

