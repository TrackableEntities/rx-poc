import { Territory } from './territory';

export class Employee {
  employeeId: number;
  lastName: string;
  firstName: string;
  birthDate: Date;
  hireDate: Date;
  city: string;
  country: string;
  territories: Territory[];
}
