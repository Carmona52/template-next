import { Customer } from './customer';

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export type OrderStatus = 'pending'| 'confirmed'| 'preparing'| 'shipped'| 'delivered'| 'cancelled';

export type PaymentMethod = 'cash' | 'credit_card' | 'debit_card' | 'transfer' | 'mercadopago' | 'paypal';

export type PaymentStatus = 'pending' | 'paid' | 'refunded' | 'failed';

export interface Order {
  id: string;
  orderNumber: string;
  customer: Customer;
  customerId: string;
  items: OrderItem[];
  totalAmount: number;
  tax: number;
  discount?: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  notes?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  deliveredAt?: Date | string;
}