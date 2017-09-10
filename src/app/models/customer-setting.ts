import { TrackableEntity } from '../framework/trackable-entitiy';
import { Customer } from './customer';

export class CustomerSetting extends TrackableEntity {
  setting: string;
  customerId: string;
  customer: Customer;

  constructor();
  constructor(setting: string, customerId: string, customer?: Customer);
  constructor(setting?: string, customerId?: string, customer?: Customer) {
    super();
    this.setting = setting;
    this.customerId = customerId;
    this.customer = customer;
    return super.proxify(this);
  }
}
