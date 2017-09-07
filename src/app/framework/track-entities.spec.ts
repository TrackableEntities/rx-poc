import { Subject } from 'rxjs/Subject';

import { Food } from '../food';
import { FoodTrackingContext } from '../food-tracking-context';
import { TrackingState } from './trackable';

xdescribe('TrackingContext', () => {

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

  it('should cache Deleted entities when tracking', (done) => {

    // Arrange
    foodContext.tracking = true;
    const food = foodContext.Food.items[0];

    // Act
    foodContext.Food.remove(food);

    // Assert
    expect(food.TrackingState).toEqual(TrackingState.Deleted);
    expect(foodContext.deletedEntities.size).toEqual(1);
    done();
  });

  it('should clear Deleted entities when not tracking', (done) => {

    // Arrange
    foodContext.tracking = true;
    const food = foodContext.Food.items[0];

    // Act
    foodContext.Food.remove(food);
    foodContext.tracking = false;

    // Assert
    expect(food.TrackingState).toEqual(TrackingState.Deleted);
    expect(foodContext.deletedEntities.size).toEqual(0);
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

  it('should set entity TrackingState to Modified when tracking', (done) => {

    // Arrange
    foodContext.tracking = true;
    const food = foodContext.Food.items[0];

    // Act
    food.desc = 'Peas';

    // Assert
    expect(food.TrackingState).toEqual(TrackingState.Modified);
    done();
  });

  it('should not set entity TrackingState to Modified when not tracking', (done) => {

    // Arrange
    foodContext.tracking = true;
    const food = foodContext.Food.items[0];

    // Act
    foodContext.tracking = false;
    food.desc = 'Peas';

    // Assert
    expect(food.TrackingState).toEqual(TrackingState.Unchanged);
    done();
  });

  it('should add to entity ModifiedProperties when tracking', (done) => {

    // Arrange
    foodContext.tracking = true;
    const food = foodContext.Food.items[0];

    // Act
    food.desc = 'Peas';
    food.price = 5;

    // Assert
    expect(food.TrackingState).toEqual(TrackingState.Modified);
    expect(food.ModifiedProperties.size).toEqual(2);
    expect(food.ModifiedProperties.has('desc')).toBeTruthy();
    expect(food.ModifiedProperties.has('price')).toBeTruthy();
    done();
  });
});
