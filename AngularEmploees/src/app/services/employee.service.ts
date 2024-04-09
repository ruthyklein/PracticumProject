import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = "https://localhost:7087/api/Employee";

  employees: BehaviorSubject<Employee[]> = new BehaviorSubject<Employee[]>([]);

  constructor(private http: HttpClient) { }
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl).pipe(
      tap(newEmployee => {
        this.employees.next(newEmployee);
      })
    );
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee).pipe(
      tap(newEmployee => {
        this.employees.next([...this.employees.value, newEmployee]);
      })
    );
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${employee.id}`, employee).pipe(
      tap(updatedEmployee => {
        this.employees.next(this.employees.value.map(e => e.id === employee.id ? updatedEmployee : e));
      })
    );
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.employees.next(this.employees.value.filter(e => e.id !== id));
      })
    );
  }
}
