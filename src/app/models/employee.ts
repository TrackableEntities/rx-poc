import { TrackableEntity } from '../framework/trackable-entitiy';
import { Territory } from './territory';

export class Employee extends TrackableEntity {
  employeeId: number;
  lastName: string;
  firstName: string;
  birthDate: Date;
  hireDate: Date;
  city: string;
  country: string;
  territories: Territory[];

  constructor();
  constructor(employeeId: number, lastName: string, firstName: string, birthDate: Date,
    hireDate: Date, city: string, country: string, ...territories: Territory[]);
  constructor(employeeId?: number, lastName?: string, firstName?: string, birthDate?: Date,
    hireDate?: Date, city?: string, country?: string, ...territories: Territory[]) {
    super();
    this.employeeId = employeeId;
    this.lastName = lastName;
    this.firstName = firstName;
    this.birthDate = birthDate;
    this.hireDate = hireDate;
    this.city = city;
    this.country = country;
    this.territories = territories;
    return super.proxify(this);
  }
}
