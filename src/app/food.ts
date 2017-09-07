import { TrackableEntity } from './framework/trackable-entitiy';
import { ObservableSet } from './framework/observable-set';
import { ObservableEntity } from './framework/observable-entity';

export class Food extends TrackableEntity {

  desc: string;
  price: number;
  ingredients: ObservableSet<string>;

  constructor(desc: string, price: number, ingredients?: string[]) {
    super();
    this.desc = desc;
    this.price = price;
    if (ingredients) {
      this.ingredients = new ObservableSet<string>(...ingredients);
    }
    return super.proxify(this);
  }
}
