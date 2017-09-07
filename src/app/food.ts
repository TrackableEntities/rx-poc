import { TrackableEntity } from './framework/trackable-entitiy';
import { ObservableCollection } from './framework/observable-collection';
import { ObservableProxy } from './framework/observable-proxy';

export class Food extends TrackableEntity {

  desc: string;
  price: number;
  ingredients: ObservableCollection<string>;

  constructor(desc: string, price: number, ingredients?: string[]) {
    super();
    this.desc = desc;
    this.price = price;
    this.ingredients = new ObservableCollection<string>(...ingredients);
    return super.proxify(this);
  }
}
