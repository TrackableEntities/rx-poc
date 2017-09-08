import { Subject } from 'rxjs/Subject';

import { Food } from '../food';
import { ObservableMap } from './observable-map';

describe('ObservableMap', () => {

  let foodMap: ObservableMap<string, Food>;

  beforeEach(() => {
    foodMap = new ObservableMap<string, Food>();
    const entries: [string, Food][] = [
      ['Bacon', new Food('Bacon', 1)],
      ['Lettuce', new Food('Lettuce', 2)],
      ['Tomatoes', new Food('Tomatoes', 3)],
    ];
    foodMap.addRange(...entries);
  });

  it('should contain items', () => {
    expect(foodMap.size).toBe(3);
  });

  it('should notify added', (done) => {

    // Arrange
    const listener = new Subject<[string, Food]>();
    const food = new Food('Carrots', 4);
    const added: [string, Food][] = [];
    listener.subscribe(entry => added.push(entry));
    foodMap.addListeners.push(listener);

    // Act
    foodMap.add(food.desc, food);

    // Assert
    expect(added.length).toEqual(1);
    expect(added[0][0]).toBe('Carrots');
    expect(added[0][1]).toBe(food);
    done();
  });

  it('should notify multiple added', (done) => {

    // Arrange
    const listener = new Subject<[string, Food]>();
    const food1 = new Food('Carrots', 4);
    const food2 = new Food('Peas', 5);
    const added: [string, Food][] = [];
    listener.subscribe(entry => added.push(entry));
    foodMap.addListeners.push(listener);

    // Act
    foodMap.addRange([food1.desc, food1], [food2.desc, food2]);

    // Assert
    expect(added.length).toEqual(2);
    expect(added[0][0]).toBe('Carrots');
    expect(added[0][1]).toBe(food1);
    expect(added[1][0]).toBe('Peas');
    expect(added[1][1]).toBe(food2);
    done();
  });

  it('should notify removed', (done) => {

    // Arrange
    const listener = new Subject<[string, Food]>();
    const food = foodMap.get('Bacon');
    const removed: [string, Food][] = [];
    listener.subscribe(entry => removed.push(entry));
    foodMap.removeListeners.push(listener);

    // Act
    foodMap.delete(food.desc);

    // Assert
    expect(removed.length).toEqual(1);
    expect(removed[0][0]).toBe(food.desc);
    expect(removed[0][1]).toBe(food);
    done();
  });

  it('should notify multiple removed', (done) => {

    // Arrange
    const listener = new Subject<[string, Food]>();
    const food1 = foodMap.get('Bacon');
    const food2 = foodMap.get('Lettuce');
    const removed: [string, Food][] = [];
    listener.subscribe(entry => removed.push(entry));
    foodMap.removeListeners.push(listener);

    // Act
    foodMap.deleteRange(food1.desc, food2.desc);

    // Assert
    expect(removed.length).toEqual(2);
    expect(removed[0][0]).toBe(food1.desc);
    expect(removed[0][1]).toBe(food1);
    expect(removed[1][0]).toBe(food2.desc);
    expect(removed[1][1]).toBe(food2);
    done();
  });
});
