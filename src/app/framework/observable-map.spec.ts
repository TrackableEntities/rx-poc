import { Subject } from 'rxjs/Subject';

import { Food } from '../food';
import { INotifyInfo } from './notify-info';
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
    const listener = new Subject<INotifyInfo>();
    const food = new Food('Carrots', 4);
    const added: INotifyInfo[] = [];
    listener.subscribe(notifyInfo => added.push(notifyInfo));
    foodMap.addListeners.push(listener);

    // Act
    foodMap.add(food.desc, food);

    // Assert
    expect(added.length).toEqual(1);
    expect(added[0].key).toBe('Carrots');
    expect(added[0].currentValue).toBe(food);
    done();
  });

  it('should notify multiple added', (done) => {

    // Arrange
    const listener = new Subject<INotifyInfo>();
    const food1 = new Food('Carrots', 4);
    const food2 = new Food('Peas', 5);
    const added: INotifyInfo[] = [];
    listener.subscribe(notifyInfo => added.push(notifyInfo));
    foodMap.addListeners.push(listener);

    // Act
    foodMap.addRange([food1.desc, food1], [food2.desc, food2]);

    // Assert
    expect(added.length).toEqual(2);
    expect(added[0].key).toBe('Carrots');
    expect(added[0].currentValue).toBe(food1);
    expect(added[1].key).toBe('Peas');
    expect(added[1].currentValue).toBe(food2);
    done();
  });

  it('should notify removed', (done) => {

    // Arrange
    const listener = new Subject<INotifyInfo>();
    const food = foodMap.get('Bacon');
    const removed: INotifyInfo[] = [];
    listener.subscribe(notifyInfo => removed.push(notifyInfo));
    foodMap.removeListeners.push(listener);

    // Act
    foodMap.delete(food.desc);

    // Assert
    expect(removed.length).toEqual(1);
    expect(removed[0].key).toBe(food.desc);
    expect(removed[0].currentValue).toBe(food);
    done();
  });

  it('should notify multiple removed', (done) => {

    // Arrange
    const listener = new Subject<INotifyInfo>();
    const food1 = foodMap.get('Bacon');
    const food2 = foodMap.get('Lettuce');
    const removed: INotifyInfo[] = [];
    listener.subscribe(notifyInfo => removed.push(notifyInfo));
    foodMap.removeListeners.push(listener);

    // Act
    foodMap.deleteRange(food1.desc, food2.desc);

    // Assert
    expect(removed.length).toEqual(2);
    expect(removed[0].key).toBe(food1.desc);
    expect(removed[0].currentValue).toBe(food1);
    expect(removed[1].key).toBe(food2.desc);
    expect(removed[1].currentValue).toBe(food2);
    done();
  });
});
