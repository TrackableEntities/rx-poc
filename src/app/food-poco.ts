import { ObservableProxy } from './framework/observable-proxy';

export class FoodPoco extends ObservableProxy<FoodPoco> {

  desc: string;
  price: number;

  constructor(desc: string, price: number) {
    super();
    this.desc = desc;
    this.price = price;
    return super.proxify(this);
  }
}
