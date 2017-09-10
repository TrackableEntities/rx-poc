import { TrackableEntity } from '../framework/trackable-entitiy';

export class Customer extends TrackableEntity {
  customerId: string;
  companyName: string;
  city: string;

  constructor();
  constructor(customerId: string, companyName: string);
  constructor(customerId?: string, companyName?: string) {
    super();
    this.customerId = customerId;
    this.companyName = companyName;
    return super.proxify(this);
  }
}
