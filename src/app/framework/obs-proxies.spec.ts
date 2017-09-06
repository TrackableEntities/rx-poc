import { Food } from '../food';
import { FoodPoco } from '../food-poco';
import { FoodTrackingContext } from '../food-tracking-context';

describe('Observable Proxies', () => {

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

  // it('should notify added', (done) => {

  //   // Arrange
  //   const listener = new Subject<Food[]>();
  //   const food = new Food('Carrots', 4);
  //   let added: Food[];
  //   listener.subscribe(items => added = items);
  //   foodContext.Food.addListeners.push(listener);

  //   // Act
  //   foodContext.Food.add(food);

  //   // Assert
  //   expect(added.length).toEqual(1);
  //   expect(added[0]).toBe(food);
  //   done();
  // });

  // it('should notify removed', (done) => {

  //   // Arrange
  //   const listener = new Subject<Food[]>();
  //   const food = foodContext.Food.items[0];
  //   let removed: Food[];
  //   listener.subscribe(items => removed = items);
  //   foodContext.Food.removeListeners.push(listener);

  //   // Act
  //   foodContext.Food.remove(food);

  //   // Assert
  //   expect(removed.length).toEqual(1);
  //   expect(removed[0]).toBe(food);
  //   done();
  // });

  fit('should notify property changed', (done) => {

    // Arrange
    const props: string[] = [];
    const food = new FoodPoco('Carrots', 4);
    food.listener.subscribe(prop => props.push(prop));

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
