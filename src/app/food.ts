import { TrackableEntity } from './framework/trackable-entitiy';

export class Food extends TrackableEntity {

  private _desc: string;
  private _price: number;

  constructor(desc: string, price: number) {
    super();
    this._desc = desc;
    this._price = price;
  }

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
