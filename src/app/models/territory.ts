import { TrackableEntity } from '../framework/trackable-entitiy';
import { Employee } from './employee';

export class Territory extends TrackableEntity {
  territoryId: string;
  territoryDescription: string;
  employees: Employee[];

  constructor();
  constructor(territoryId: string, territoryDescription: string, ...employees: Employee[]);
  constructor(territoryId?: string, territoryDescription?: string, ...employees: Employee[]) {
    super();
    this.territoryId = territoryId;
    this.territoryDescription = territoryDescription;
    this.employees = employees;
    return super.proxify(this);
  }
}
