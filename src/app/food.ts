import { ITrackable, TrackingState } from './framework/trackable';
import { ObservableEntity } from './framework/observable-entity';

export class Food extends ObservableEntity implements ITrackable {

  public TrackingState: TrackingState;
  public ModifiedProperties: string[];

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
