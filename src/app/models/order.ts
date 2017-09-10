import { TrackableEntity } from '../framework/trackable-entitiy';
import { Customer } from './customer';

export class Order extends TrackableEntity {
  orderId: number;
  orderDate: Date;
  customerId: string;
  customer: Customer;

  constructor();
  constructor(orderId: number, orderDate: Date, customerId: string, customer: Customer);
  constructor(orderId?: number, orderDate?: Date, customerId?: string, customer?: Customer) {
    super();
    this.orderId = orderId;
    this.orderDate = orderDate;
    this.customerId = customerId;
    this.customer = this.customer;
    return super.proxify(this);
  }
}
