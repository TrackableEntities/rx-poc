import { Subject } from 'rxjs/Subject';

import { Food } from '../food';
import { FoodTrackingContext } from '../food-tracking-context';
import { TrackingState } from './trackable';

fdescribe('TrackingContext', () => {

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

  it('should be created', () => {
    expect(foodContext).toBeTruthy();
  });

  it('should contain items', () => {
    expect(foodContext.Food.items.length).toBe(3);
  });

  it('should set entity TrackingState to Added when tracking', (done) => {

    // Arrange
    foodContext.tracking = true;
    const food = new Food('Carrots', 4);

    // Act
    foodContext.Food.add(food);

    // Assert
    expect(food.TrackingState).toEqual(TrackingState.Added);
    done();
  });

  it('should not set entity TrackingState to Added when not tracking', (done) => {

    // Arrange
    foodContext.tracking = true;
    const food = new Food('Carrots', 4);

    // Act
    foodContext.tracking = false;
    foodContext.Food.add(food);

    // Assert
    expect(food.TrackingState).toEqual(TrackingState.Unchanged);
    done();
  });

  it('should set entity TrackingState to Deleted when tracking', (done) => {

    // Arrange
    foodContext.tracking = true;
    const food = foodContext.Food.items[0];

    // Act
    foodContext.Food.remove(food);

    // Assert
    expect(food.TrackingState).toEqual(TrackingState.Deleted);
    done();
  });

  it('should not set entity TrackingState to Deleted when not tracking', (done) => {

    // Arrange
    foodContext.tracking = true;
    const food = foodContext.Food.items[0];

    // Act
    foodContext.tracking = false;
    foodContext.Food.remove(food);

    // Assert
    expect(food.TrackingState).toEqual(TrackingState.Unchanged);
    done();
  });

  it('should notify property changed', (done) => {

    // Arrange
    const listener = new Subject<string>();
    const props: string[] = [];
    const food = new Food('Carrots', 4);
    listener.subscribe(prop => props.push(prop));
    food.listener = listener;

    // Act
    food.desc = 'Peas';
    food.price = 5;

    // Assert
    expect(props.length).toEqual(2);
    expect(props[0]).toEqual('desc');
    expect(props[1]).toEqual('price');
    done();
  });
});