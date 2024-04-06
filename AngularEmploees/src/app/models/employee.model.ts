import { EmployeePosition } from './employeePosition.model'

export class Employee {
  id: number;
  idNumber: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: Date;
  startOfWorkDate: Date;
  positionList: EmployeePosition[];
}

export enum EGender {
  male,
  female
}




