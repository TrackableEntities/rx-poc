import * as traverse from 'traverse';
import { MockNorthwind } from '../northwind/mock-northwind';

fdescribe('Traverse.', () => {

  const northwind = new MockNorthwind();

  it('should traverse product', (done) => {
    const product = northwind.Products[0];

    traverse(product).forEach(x => {
      console.log(`value: ${x}`);
      // console.log(`key: ${this.key}`);
      // console.log(`node: ${this.node}`);
      // console.log(`path: ${this.path}`);
      // console.log(`parent: ${this.parent}`);
      // console.log(`level: ${this.level}`);
    });
    done();
  });
});
