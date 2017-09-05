import * as traverse from 'traverse';
import { MockNorthwind } from '../northwind/mock-northwind';

describe('Traverse.', () => {

  const northwind = new MockNorthwind();

  it('should traverse product', () => {
    const product = northwind.Products[0];

    traverse(product).forEach(x => {
      console.log(x);
    });
  });
});
