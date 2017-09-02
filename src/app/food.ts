import { ObservableEntity } from './observable-entity';

export class Food extends ObservableEntity {

  private _desc: string;
  private _price: number;

  get desc(): string {
    return this._desc;
  }
  set desc(value: string) {
    this._desc = value;
    super.notify('desc');
  }

  get price(): number {
    return this._price;
  }
  set price(value: number) {
    this._price = value;
    super.notify('price');
  }
}
