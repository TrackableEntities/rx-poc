import { Customer } from './customer';

export class Order {
  orderId: number;
  customerId: string;
  orderDate: Date;
  customer: Customer;
}
