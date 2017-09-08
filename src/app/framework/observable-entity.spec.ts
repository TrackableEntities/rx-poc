import { Subject } from 'rxjs/Subject';

import { Food } from '../food';
import { ObservableEntity, PropertyNotifyInfo } from './observable-entity';

describe('Observable Entity', () => {

  it('ctor should return proxy', () => {
    const food = new Food('Carrots', 4);
    expect(food.updateListeners).toBeTruthy();
  });

  it('factory should return proxy', () => {
    const food = ObservableEntity.proxify(Food);
    expect(food.updateListeners).toBeTruthy();
  });

  it('should notify property changed', (done) => {

    // Arrange
    const listener = new Subject<PropertyNotifyInfo>();
    const props: PropertyNotifyInfo[] = [];
    const food = new Food('Carrots', 4);
    listener.subscribe(prop => props.push(prop));
    food.updateListeners.push(listener);

    // Act
    food.desc = 'Peas';
    food.price = 5;

    // Assert
    expect(props.length).toEqual(2);
    expect(props[0].key).toEqual('desc');
    expect(props[1].key).toEqual('price');
    done();
  });
});
