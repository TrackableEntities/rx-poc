import { TrackableEntity } from '../framework/trackable-entitiy';
import { Category } from './category';

export class Product extends TrackableEntity {
  productId: number;
  productName: string;
  unitPrice: number;
  categoryId: number;
  category: Category;
  constructor();
  constructor(productName: string, unitPrice: number);
  constructor(productName?: string, unitPrice?: number) {
    super();
    this.productName = productName;
    this.unitPrice = unitPrice;
    return super.proxify(this);
  }
}
