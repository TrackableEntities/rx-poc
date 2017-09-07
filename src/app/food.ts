import { TrackableEntity } from './framework/trackable-entitiy';
import { ObservableCollection } from './framework/observable-collection';
import { ObservableEntityProxy } from './framework/observable-entity-proxy';

export class Food extends TrackableEntity {

  desc: string;
  price: number;
  ingredients: ObservableCollection<string>;

  constructor(desc: string, price: number, ingredients?: string[]) {
    super();
    this.desc = desc;
    this.price = price;
    if (ingredients) {
      this.ingredients = new ObservableCollection<string>(...ingredients);
    }
    return super.proxify(this);
  }
}
