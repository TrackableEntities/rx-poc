import { TrackableEntity } from '../framework/trackable-entitiy';
import { Order } from './order';
import { Product } from './product';

export class OrderDetail extends TrackableEntity {
  orderDetailId: number;
  unitPrice: number;
  quantity: number;
  orderId: number;
  order: Order;
  productId: number;
  product: Product;

  constructor();
  constructor(orderDetailId: number, unitPrice: number, quantity: number,
    orderId: number, order: Order, productId: number, product: Product);
  constructor(orderDetailId?: number, unitPrice?: number, quantity?: number,
    orderId?: number, order?: Order, productId?: number, product?: Product) {
    super();
    this.orderDetailId = orderDetailId;
    this.unitPrice = unitPrice;
    this.quantity = quantity;
    this.orderId = orderId;
    this.order = order;
    this.productId = productId;
    this.product = product;
    return super.proxify(this);
  }
}
