import { Subject } from 'rxjs/Subject';

import { Food } from '../food';

describe('Observable Proxies', () => {

  it('should notify property changed', (done) => {

    // Arrange
    const props: [string, any][] = [];
    const food = new Food('Carrots', 4);
    const listener = new Subject<[string, any]>();
    listener.subscribe(prop => props.push([prop[0], prop[1]]));
    food.updateListeners.push(listener);

    // Act
    food.desc = 'Peas';
    food.price = 5;

    // Assert
    expect(props.length).toEqual(2);
    expect(props[0][0]).toEqual('desc');
    expect(props[0][1]).toEqual('Peas');
    expect(props[1][0]).toEqual('price');
    expect(props[1][1]).toEqual(5);
    done();
  });

  it('should not notify property changed', (done) => {

    // Arrange
    const props: [string, any][] = [];
    const food = new Food('Carrots', 4);
    const listener = new Subject<[string, any]>();
    listener.subscribe(prop => props.push([prop[0], prop[1]]));
    food.updateListeners.push(listener);

    // Act
    food.desc = 'Carrots';
    food.price = 4;

    // Assert
    expect(props.length).toEqual(0);
    done();
  });

  it('with push should notify item added', (done) => {

    // Arrange
    const items: string[] = [];
    const food = new Food('Cake', 4, ['Flour', 'Eggs', 'Milk']);
    const listener = new Subject<any>();
    listener.subscribe(added => items.push(added));
    food.ingredients.addListeners.push(listener);

    // Act
    food.ingredients.add('Butter');

    // Assert
    expect(items.length).toEqual(1);
    expect(items[0]).toEqual('Butter');
    done();
  });

  it('with remove notify item removed', (done) => {

    // Arrange
    const items: string[] = [];
    const food = new Food('Cake', 4, ['Flour', 'Eggs', 'Milk']);
    const listener = new Subject<any>();
    listener.subscribe(removed => items.push(removed));
    food.ingredients.removeListeners.push(listener);

    // Act
    food.ingredients.delete('Eggs');

    // Assert
    expect(items.length).toEqual(1);
    expect(items[0]).toEqual('Eggs');
    done();
  });
});
