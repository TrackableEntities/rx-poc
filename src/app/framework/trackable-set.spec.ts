import { Food } from '../food';
import { TrackingState } from './trackable';
import { TrackableSet } from './trackable-set';

describe('TrackableSet', () => {

  let trackableSet: TrackableSet<Food>;

  beforeEach(() => {
    const foods = [
      new Food('Bacon', 1),
      new Food('Lettuce', 2),
      new Food('Tomatoes', 3),
    ];
    trackableSet = new TrackableSet<Food>(...foods);
  });

  it('should be created', () => {
    expect(trackableSet).toBeTruthy();
  });

  it('should contain items', () => {
    expect(trackableSet.size).toBe(3);
  });

  it('should set entity TrackingState to Added when tracking', (done) => {

    // Arrange
    trackableSet.tracking = true;
    const food = new Food('Carrots', 4);

    // Act
    trackableSet.add(food);

    // Assert
    expect(food.TrackingState).toEqual(TrackingState.Added);
    done();
  });

  it('should not set entity TrackingState to Added when not tracking', (done) => {

    // Arrange
    trackableSet.tracking = true;
    const food = new Food('Carrots', 4);

    // Act
    trackableSet.tracking = false;
    trackableSet.add(food);

    // Assert
    expect(food.TrackingState).toEqual(TrackingState.Unchanged);
    done();
  });

  it('should set entity TrackingState to Deleted when tracking', (done) => {

    // Arrange
    trackableSet.tracking = true;
    const food = [...trackableSet][0];

    // Act
    trackableSet.delete(food);

    // Assert
    expect(food.TrackingState).toEqual(TrackingState.Deleted);
    done();
  });

  it('should not set entity TrackingState to Deleted when not tracking', (done) => {

    // Arrange
    trackableSet.tracking = true;
    const food = [...trackableSet][0];

    // Act
    trackableSet.tracking = false;
    trackableSet.delete(food);

    // Assert
    expect(food.TrackingState).toEqual(TrackingState.Unchanged);
    done();
  });

  it('should cache Deleted entities when tracking', (done) => {

    // Arrange
    trackableSet.tracking = true;
    const food = [...trackableSet][0];

    // Act
    trackableSet.delete(food);

    // Assert
    expect(food.TrackingState).toEqual(TrackingState.Deleted);
    expect(trackableSet.deletedEntities.size).toEqual(1);
    done();
  });

  it('should clear Deleted entities when not tracking', (done) => {

    // Arrange
    trackableSet.tracking = true;
    const food = [...trackableSet][0];

    // Act
    trackableSet.delete(food);
    trackableSet.tracking = false;

    // Assert
    expect(food.TrackingState).toEqual(TrackingState.Deleted);
    expect(trackableSet.deletedEntities.size).toEqual(0);
    done();
  });

  it('should set entity TrackingState to Modified when tracking', (done) => {

    // Arrange
    trackableSet.tracking = true;
    const food = [...trackableSet][0];

    // Act
    food.desc = 'Peas';

    // Assert
    expect(food.TrackingState).toEqual(TrackingState.Modified);
    done();
  });

  it('should not set entity TrackingState to Modified when tracking but not changed', (done) => {

    // Arrange
    trackableSet.tracking = true;
    const food = [...trackableSet][0];

    // Act
    food.desc = food.desc;

    // Assert
    expect(food.TrackingState).toEqual(TrackingState.Unchanged);
    done();
  });

  it('should not set entity TrackingState to Modified when not tracking', (done) => {

    // Arrange
    trackableSet.tracking = true;
    const food = [...trackableSet][0];

    // Act
    trackableSet.tracking = false;
    food.desc = 'Peas';

    // Assert
    expect(food.TrackingState).toEqual(TrackingState.Unchanged);
    done();
  });

  it('should add to entity ModifiedProperties when tracking', (done) => {

    // Arrange
    trackableSet.tracking = true;
    const food = [...trackableSet][0];

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
