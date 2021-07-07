import { Order } from './order';
import { Product } from './product';

export class OrderDetail {
  orderDetailId: number;
  unitPrice: number;
  quantity: number;
  orderId: number;
  order: Order;
  productId: number;
  product: Product;
}
