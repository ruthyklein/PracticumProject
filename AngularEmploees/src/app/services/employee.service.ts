import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Employee } from '../models/employee.model';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService  {

  private apiUrl = "https://localhost:7087/api/Employee";

   employees: Observable<Employee[]> = new Observable<Employee[]>();

  constructor(private http: HttpClient) {
    //this.employees = this.getEmployees();
  }
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  /*addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee);
  }

 updateEmployee(employee: Employee): Observable<Employee> {
    this.employees = this.employees.pipe(map(list => {
      let i = list.findIndex(e => e.id === employee.id);
      if (i > -1) {
        list[i] = employee;
      }
      return list;
    }));
     return this.http.put<Employee>(`${this.apiUrl}/${employee.id}`, employee);
  }

  deleteEmployee(id: number): Observable<void> {
    this.employees = this.employees.pipe(map(list => {
      let i = list.findIndex(e => e.id === id);
      if (i > -1) {
        delete list[i];
      }
      return list;
    }));
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }*/
  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee).pipe(
      tap(newEmployee => {
        this.employees = this.employees.pipe(
          map(list => [...list, newEmployee])
        );
      })
    );
  }
  
  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${employee.id}`, employee).pipe(
      tap(updatedEmployee => {
        this.employees = this.employees.pipe(map(list => {
          let updatedIndex = list.findIndex(e => e.id === updatedEmployee.id);
          if (updatedIndex !== -1) {
            list[updatedIndex] = updatedEmployee;
          }
          return list;
        }));
      })
    );
  }
  
  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.employees = this.employees.pipe(map(list => list.filter(e => e.id !== id)));
      })
    );
  }
}
/*import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = "https://localhost:7087/api/Employee";
  public employees: Observable<Employee[]>;

  constructor(private http: HttpClient) {
    this.employees = this.fetchEmployeesFromServer();
  }

  private fetchEmployeesFromServer(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  getEmployees(): Observable<Employee[]> {
    return this.employees;
  }

  // פונקציה זו מוסיפה עובד חדש לשרת ואז מעדכנת את המערך המקומי
  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee).pipe(
      tap(newEmployee => {
        // קריאה לפונקציה הפרטית שמתעדכנת מהשרת
        this.employees = this.fetchEmployeesFromServer();
      })
    );
  }

  // פונקציה זו מעדכנת עובד קיים בשרת ואז מעדכנת את המערך המקומי
  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${employee.id}`, employee).pipe(
      tap(updatedEmployee => {
        // קריאה לפונקציה הפרטית שמתעדכנת מהשרת
        this.employees = this.fetchEmployeesFromServer();
      })
    );
  }

  // פונקציה זו מוחקת עובד מהשרת ואז מעדכנת את המערך המקומי
  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        // קריאה לפונקציה הפרטית שמתעדכנת מהשרת
        this.employees = this.fetchEmployeesFromServer();
      })
    );
  }
}*/
