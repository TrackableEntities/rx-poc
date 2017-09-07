import { KeyValuePair } from './observable-entity';
import { ObservableSet } from './observable-set';
import { Subject } from 'rxjs/Subject';

import { Food } from '../food';

describe('Observable Entities', () => {

  let foodSet: ObservableSet<Food>;

  beforeEach(() => {
    foodSet = new ObservableSet<Food>();
    const foods = [
      new Food('Bacon', 1),
      new Food('Lettuce', 2),
      new Food('Tomatoes', 3),
    ];
    foodSet.addRange(...foods);
  });

  it('should contain items', () => {
    expect(foodSet.size).toBe(3);
  });

  it('should notify added', (done) => {

    // Arrange
    const listener = new Subject<Food>();
    const food = new Food('Carrots', 4);
    const added: Food[] = [];
    listener.subscribe(item => added.push(item));
    foodSet.addListeners.push(listener);

    // Act
    foodSet.add(food);

    // Assert
    expect(added.length).toEqual(1);
    expect(added[0]).toBe(food);
    done();
  });

  it('should notify multiple added', (done) => {

    // Arrange
    const listener = new Subject<Food>();
    const food1 = new Food('Carrots', 4);
    const food2 = new Food('Peas', 5);
    const added: Food[] = [];
    listener.subscribe(item => added.push(item));
    foodSet.addListeners.push(listener);

    // Act
    foodSet.addRange(food1, food2);

    // Assert
    expect(added.length).toEqual(2);
    expect(added[0]).toBe(food1);
    expect(added[1]).toBe(food2);
    done();
  });

  it('should notify removed', (done) => {

    // Arrange
    const listener = new Subject<Food>();
    const food = foodSet[0];
    const removed: Food[] = [];
    listener.subscribe(item => removed.push(item));
    foodSet.removeListeners.push(listener);

    // Act
    foodSet.delete(food);

    // Assert
    expect(removed.length).toEqual(1);
    expect(removed[0]).toBe(food);
    done();
  });

  it('should notify multiple removed', (done) => {

    // Arrange
    const listener = new Subject<Food>();
    const food1 = foodSet[0];
    const food2 = foodSet[1];
    const removed: Food[] = [];
    listener.subscribe(item => removed.push(item));
    foodSet.removeListeners.push(listener);

    // Act
    foodSet.deleteRange(food1, food2);

    // Assert
    expect(removed.length).toEqual(2);
    expect(removed[0]).toBe(food1);
    expect(removed[1]).toBe(food2);
    done();
  });

  it('should notify property changed', (done) => {

    // Arrange
    const listener = new Subject<KeyValuePair>();
    const props: KeyValuePair[] = [];
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
