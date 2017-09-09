import { INotifyInfo } from './notify-info';
import { Subject } from 'rxjs/Subject';

import { Food } from '../food';
import { ObservableSet } from './observable-set';

describe('ObservableSet', () => {

  describe('with strings', () => {

    it('add should notify item added', (done) => {

      // Arrange
      const items: string[] = [];
      const foods = new ObservableSet<string>('Bacon', 'Lettuce', 'Tomato');
      const listener = new Subject<INotifyInfo>();
      listener.subscribe(notifyInfo => items.push(notifyInfo.currentValue));
      foods.addListeners.push(listener);

      // Act
      foods.add('Carrots');

      // Assert
      expect(items.length).toEqual(1);
      expect(items[0]).toEqual('Carrots');
      done();
    });

    it('delete notify item removed', (done) => {

      // Arrange
      const items: string[] = [];
      const foods = new ObservableSet<string>('Bacon', 'Lettuce', 'Tomato');
      const listener = new Subject<INotifyInfo>();
      listener.subscribe(notifyInfo => items.push(notifyInfo.currentValue));
      foods.removeListeners.push(listener);

      // Act
      foods.delete('Lettuce');

      // Assert
      expect(items.length).toEqual(1);
      expect(items[0]).toEqual('Lettuce');
      done();
    });
  });

  describe('with entities', () => {

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
      const listener = new Subject<INotifyInfo>();
      const food = new Food('Carrots', 4);
      const added: Food[] = [];
      listener.subscribe(notifyInfo => added.push(notifyInfo.currentValue));
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
      const listener = new Subject<INotifyInfo>();
      const food1 = new Food('Carrots', 4);
      const food2 = new Food('Peas', 5);
      const added: Food[] = [];
      listener.subscribe(notifyInfo => added.push(notifyInfo.currentValue));
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
      const listener = new Subject<INotifyInfo>();
      const food = [...foodSet][0];
      const removed: Food[] = [];
      listener.subscribe(notifyInfo => removed.push(notifyInfo.currentValue));
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
      const listener = new Subject<INotifyInfo>();
      const food1 = [...foodSet][0];
      const food2 = [...foodSet][1];
      const removed: Food[] = [];
      listener.subscribe(notifyInfo => removed.push(notifyInfo.currentValue));
      foodSet.removeListeners.push(listener);

      // Act
      foodSet.deleteRange(food1, food2);

      // Assert
      expect(removed.length).toEqual(2);
      expect(removed[0]).toBe(food1);
      expect(removed[1]).toBe(food2);
      done();
    });
  });
});
