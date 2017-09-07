import { Subject } from 'rxjs/Subject';

import { Food } from '../food';
import { KeyValuePair } from './observable-entity';
import { TrackingState } from './trackable';
import { TrackableSet } from './trackable-set';

xdescribe('TrackableSet', () => {

  let changeTracker: TrackableSet<Food>;

  beforeEach(() => {
    const foods = [
      new Food('Bacon', 1),
      new Food('Lettuce', 2),
      new Food('Tomatoes', 3),
    ];
    changeTracker = new TrackableSet<Food>(...foods);
  });

  it('should be created', () => {
    expect(changeTracker).toBeTruthy();
  });

  it('should contain items', () => {
    expect(changeTracker.size).toBe(3);
  });

  it('should set entity TrackingState to Added when tracking', (done) => {

    // Arrange
    changeTracker.tracking = true;
    const food = new Food('Carrots', 4);

    // Act
    changeTracker.add(food);

    // Assert
    expect(food.TrackingState).toEqual(TrackingState.Added);
    done();
  });

  it('should not set entity TrackingState to Added when not tracking', (done) => {

    // Arrange
    changeTracker.tracking = true;
    const food = new Food('Carrots', 4);

    // Act
    changeTracker.tracking = false;
    changeTracker.add(food);

    // Assert
    expect(food.TrackingState).toEqual(TrackingState.Unchanged);
    done();
  });

  it('should set entity TrackingState to Deleted when tracking', (done) => {

    // Arrange
    changeTracker.tracking = true;
    const food = changeTracker[0];

    // Act
    changeTracker.delete(food);

    // Assert
    expect(food.TrackingState).toEqual(TrackingState.Deleted);
    done();
  });

  it('should not set entity TrackingState to Deleted when not tracking', (done) => {

    // Arrange
    changeTracker.tracking = true;
    const food = changeTracker[0];

    // Act
    changeTracker.tracking = false;
    changeTracker.delete(food);

    // Assert
    expect(food.TrackingState).toEqual(TrackingState.Unchanged);
    done();
  });

  it('should cache Deleted entities when tracking', (done) => {

    // Arrange
    changeTracker.tracking = true;
    const food = changeTracker[0];

    // Act
    changeTracker.delete(food);

    // Assert
    expect(food.TrackingState).toEqual(TrackingState.Deleted);
    expect(changeTracker.deletedEntities.size).toEqual(1);
    done();
  });

  it('should clear Deleted entities when not tracking', (done) => {

    // Arrange
    changeTracker.tracking = true;
    const food = changeTracker[0];

    // Act
    changeTracker.delete(food);
    changeTracker.tracking = false;

    // Assert
    expect(food.TrackingState).toEqual(TrackingState.Deleted);
    expect(changeTracker.deletedEntities.size).toEqual(0);
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
    expect(props[0][0]).toEqual('desc');
    expect(props[1][0]).toEqual('price');
    done();
  });

  it('should set entity TrackingState to Modified when tracking', (done) => {

    // Arrange
    changeTracker.tracking = true;
    const food = changeTracker[0];

    // Act
    food.desc = 'Peas';

    // Assert
    expect(food.TrackingState).toEqual(TrackingState.Modified);
    done();
  });

  it('should not set entity TrackingState to Modified when not tracking', (done) => {

    // Arrange
    changeTracker.tracking = true;
    const food = changeTracker[0];

    // Act
    changeTracker.tracking = false;
    food.desc = 'Peas';

    // Assert
    expect(food.TrackingState).toEqual(TrackingState.Unchanged);
    done();
  });

  it('should add to entity ModifiedProperties when tracking', (done) => {

    // Arrange
    changeTracker.tracking = true;
    const food = changeTracker[0];

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
