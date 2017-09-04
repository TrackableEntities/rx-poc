import { Category } from './category';

export class Product {
  productId: number;
  productName: string;
  unitPrice: number;
  categoryId: number;
  category: Category;
}
