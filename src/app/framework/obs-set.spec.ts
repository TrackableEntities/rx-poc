import { ObservableSet } from './observable-set';
import { Subject } from 'rxjs/Subject';

import { Food } from '../food';

describe('Observable Set', () => {

  it('add should notify item added', (done) => {

    // Arrange
    const items: string[] = [];
    const foods = new ObservableSet<string>('Bacon', 'Lettuce', 'Tomato');
    const listener = new Subject<string>();
    listener.subscribe(added => items.push(added));
    foods.addListeners.push(listener);

    // Act
    foods.add('Carrots');

    // Assert
    expect(items.length).toEqual(1);
    expect(items[0]).toEqual('Carrots');
    done();
  });

  it('delete notify item removed', (done) => {

    // Arrange
    const items: string[] = [];
    const foods = new ObservableSet<string>('Bacon', 'Lettuce', 'Tomato');
    const listener = new Subject<string>();
    listener.subscribe(added => items.push(added));
    foods.removeListeners.push(listener);

    // Act
    foods.delete('Lettuce');

    // Assert
    expect(items.length).toEqual(1);
    expect(items[0]).toEqual('Lettuce');
    done();
  });
});
