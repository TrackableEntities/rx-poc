import { Product } from '../northwind/product';
import * as _ from 'lodash';

import { MockNorthwind } from '../northwind/mock-northwind';
import { Category } from '../northwind/category';

fdescribe('Lodash CloneDeep', () => {

  const northwind = new MockNorthwind();

  it('should deep clone product', () => {
    const product = northwind.Products[0];

    const clone = _.cloneDeep(product);

    validateClone(clone, product);
  });

  it('should deep clone product array', () => {
    const clones = _.cloneDeep(northwind.Products);

    validateClone(clones[0], northwind.Products[0]);
    validateClone(clones[1], northwind.Products[1]);
    validateClone(clones[2], northwind.Products[2]);
    validateClone(clones[3], northwind.Products[3]);
    validateClone(clones[4], northwind.Products[4]);
  });

  function validateClone(clone: Product, product: Product): void {
    expect(clone).not.toBe(product);
    expect(clone.category).not.toBe(product.category);
    expect(clone.category.products).not.toBe(product.category.products);
    expect(clone.category.products[0]).not.toBe(product.category.products[0]);
    expect(clone.category.products[1]).not.toBe(product.category.products[1]);

    expect(clone.productId).toEqual(product.productId);
    expect(clone.productName).toEqual(product.productName);
    expect(clone.unitPrice).toEqual(product.unitPrice);
    expect(clone.categoryId).toEqual(product.categoryId);
    expect(clone.category.categoryId).toEqual(product.category.categoryId);
    expect(clone.category.categoryName).toEqual(product.category.categoryName);
    expect(clone.category.products[0].productName).toEqual(product.category.products[0].productName);
    expect(clone.category.products[0].category.categoryName).toEqual(product.category.products[0].category.categoryName);
  }
});
