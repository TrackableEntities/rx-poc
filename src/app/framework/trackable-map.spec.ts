import { Food } from '../food';
import { TrackingState } from './trackable';
import { TrackableMap } from './trackable-map';

describe('TrackableMap', () => {

  let trackableMap: TrackableMap<string, Food>;

  beforeEach(() => {
    const entries: [string, Food][] = [
      ['Bacon', new Food('Bacon', 1)],
      ['Lettuce', new Food('Lettuce', 2)],
      ['Tomatoes', new Food('Tomatoes', 3)],
    ];
    trackableMap = new TrackableMap<string, Food>(...entries);
  });

  it('should be created', () => {
    expect(trackableMap).toBeTruthy();
  });

  it('should contain items', () => {
    expect(trackableMap.size).toBe(3);
  });

  it('should set entity TrackingState to Added when tracking', (done) => {

    // Arrange
    trackableMap.tracking = true;
    const food = new Food('Carrots', 4);

    // Act
    trackableMap.add(food.desc, food);

    // Assert
    expect(food.TrackingState).toEqual(TrackingState.Added);
    done();
  });

  it('should not set entity TrackingState to Added when not tracking', (done) => {

    // Arrange
    trackableMap.tracking = true;
    const food = new Food('Carrots', 4);

    // Act
    trackableMap.tracking = false;
    trackableMap.add(food.desc, food);

    // Assert
    expect(food.TrackingState).toEqual(TrackingState.Unchanged);
    done();
  });

  it('should set entity TrackingState to Deleted when tracking', (done) => {

    // Arrange
    trackableMap.tracking = true;
    const entry = [...trackableMap][0];

    // Act
    trackableMap.delete(entry[0]);

    // Assert
    expect(entry[1].TrackingState).toEqual(TrackingState.Deleted);
    done();
  });

  it('should not set entity TrackingState to Deleted when not tracking', (done) => {

    // Arrange
    trackableMap.tracking = true;
    const entry = [...trackableMap][0];

    // Act
    trackableMap.tracking = false;
    trackableMap.delete(entry[0]);

    // Assert
    expect(entry[1].TrackingState).toEqual(TrackingState.Unchanged);
    done();
  });

  it('should cache Deleted entities when tracking', (done) => {

    // Arrange
    trackableMap.tracking = true;
    const entry = [...trackableMap][0];

    // Act
    trackableMap.delete(entry[0]);

    // Assert
    expect(entry[1].TrackingState).toEqual(TrackingState.Deleted);
    expect([...trackableMap.deletedEntities][0]).toBe(entry[1]);
    done();
  });

  it('should clear Deleted entities when not tracking', (done) => {

    // Arrange
    trackableMap.tracking = true;
    const entry = [...trackableMap][0];

    // Act
    trackableMap.delete(entry[0]);
    trackableMap.tracking = false;

    // Assert
    expect(entry[1].TrackingState).toEqual(TrackingState.Deleted);
    expect(trackableMap.deletedEntities.size).toEqual(0);
    done();
  });

  it('should set entity TrackingState to Modified when tracking', (done) => {

    // Arrange
    trackableMap.tracking = true;
    const entry = [...trackableMap][0];

    // Act
    entry[1].desc = 'Peas';

    // Assert
    expect(entry[1].TrackingState).toEqual(TrackingState.Modified);
    done();
  });

  it('should not set entity TrackingState to Modified when tracking but not changed', (done) => {

    // Arrange
    trackableMap.tracking = true;
    const entry = [...trackableMap][0];

    // Act
    entry[1].desc = entry[1].desc;

    // Assert
    expect(entry[1].TrackingState).toEqual(TrackingState.Unchanged);
    done();
  });

  it('should not set entity TrackingState to Modified when not tracking', (done) => {

    // Arrange
    trackableMap.tracking = true;
    const entry = [...trackableMap][0];

    // Act
    trackableMap.tracking = false;
    entry[1].desc = 'Peas';

    // Assert
    expect(entry[1].TrackingState).toEqual(TrackingState.Unchanged);
    done();
  });

  it('should add to entity ModifiedProperties when tracking', (done) => {

    // Arrange
    trackableMap.tracking = true;
    const entry = [...trackableMap][0];

    // Act
    entry[1].desc = 'Peas';
    entry[1].price = 5;

    // Assert
    expect(entry[1].TrackingState).toEqual(TrackingState.Modified);
    expect(entry[1].ModifiedProperties.size).toEqual(2);
    expect(entry[1].ModifiedProperties.has('desc')).toBeTruthy();
    expect(entry[1].ModifiedProperties.has('price')).toBeTruthy();
    done();
  });
});
