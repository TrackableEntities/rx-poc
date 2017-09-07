import { Subject } from 'rxjs/Subject';

import { Food } from '../food';
import { FoodTrackingContext } from '../food-tracking-context';

describe('Observable Entities', () => {

  let foodContext: FoodTrackingContext;

  beforeEach(() => {
    foodContext = new FoodTrackingContext();
    const foods = [
      new Food('Bacon', 1),
      new Food('Lettuce', 2),
      new Food('Tomatoes', 3),
    ];
    foodContext.Food.items = foods;
  });

  it('should contain items', () => {
    expect(foodContext.Food.items.length).toBe(3);
  });

  it('should notify added', (done) => {

    // Arrange
    const listener = new Subject<Food>();
    const food = new Food('Carrots', 4);
    const added: Food[] = [];
    listener.subscribe(item => added.push(item));
    foodContext.Food.addListeners.push(listener);

    // Act
    foodContext.Food.add(food);

    // Assert
    expect(added.length).toEqual(1);
    expect(added[0]).toBe(food);
    done();
  });

  it('should notify multiple added', (done) => {

    // Arrange
    const listener = new Subject<Food[]>();
    const food1 = new Food('Carrots', 4);
    const food2 = new Food('Peas', 5);
    let added: Food[];
    listener.subscribe(items => added = items);
    foodContext.Food.addListeners.push(listener);

    // Act
    foodContext.Food.add(food1, food2);

    // Assert
    expect(added.length).toEqual(2);
    expect(added[0]).toBe(food1);
    expect(added[1]).toBe(food2);
    done();
  });

  it('should notify removed', (done) => {

    // Arrange
    const listener = new Subject<Food>();
    const food = foodContext.Food.items[0];
    const removed: Food[] = [];
    listener.subscribe(item => removed.push(item));
    foodContext.Food.removeListeners.push(listener);

    // Act
    foodContext.Food.remove(food);

    // Assert
    expect(removed.length).toEqual(1);
    expect(removed[0]).toBe(food);
    done();
  });

  it('should notify multiple removed', (done) => {

    // Arrange
    const listener = new Subject<Food[]>();
    const food1 = foodContext.Food.items[0];
    const food2 = foodContext.Food.items[1];
    let removed: Food[];
    listener.subscribe(item => removed = item);
    foodContext.Food.removeListeners.push(listener);

    // Act
    foodContext.Food.remove(food1, food2);

    // Assert
    expect(removed.length).toEqual(2);
    expect(removed[0]).toBe(food1);
    expect(removed[1]).toBe(food2);
    done();
  });

  it('should notify property changed', (done) => {

    // Arrange
    const listener = new Subject<[string, any]>();
    const props: [string, any][] = [];
    const food = new Food('Carrots', 4);
    listener.subscribe(prop => props.push(prop));
    food.updateListeners.push(listener);

    // Act
    food.desc = 'Peas';
    food.price = 5;

    // Assert
    expect(props.length).toEqual(2);
    expect(props[0][0]).toEqual('desc');
    expect(props[1][0]).toEqual('price');
    done();
  });
});
