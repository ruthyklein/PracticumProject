import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PositionService } from '../../services/position.service';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';
import { DeleteEmployeeComponent } from '../delete-employee/delete-employee.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EmployeeRoutingModule } from '../employee/employee-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
@Component({
  selector: 'app-employees-table',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatTooltipModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatNativeDateModule
  ],
  templateUrl: './employees-table.component.html',
  styleUrl: './employees-table.component.scss'
})
export class EmployeesTableComponent implements AfterViewInit {
  employees: Employee[] = [];
  displayedColumns: string[] = ['idNumber', 'firstName', 'lastName', 'startOfWorkDate', 'actions'];
  dataSource!: MatTableDataSource<Employee>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private employeeService: EmployeeService, private dialog: MatDialog, private positionService: PositionService) { }

  ngAfterViewInit() {
    this.getEmployees();
  }
  getEmployees(): void {
    this.employeeService.employees = this.employeeService.getEmployees();
    this.employeeService.employees.subscribe({
      next: (res: Employee[]) => {
        this.employees = res;
        this.dataSource = new MatTableDataSource(this.employees);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log("Employees fetched successfully:");
        console.log(this.employees);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDeleteConfirmation(employee: Employee): void {
    const dialogRef = this.dialog.open(DeleteEmployeeComponent, {
      width: '400px',
      data: { employee }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employees = this.employees.filter(emp => emp.id !== employee.id);
        this.dataSource = new MatTableDataSource(this.employees);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }
  openEditEmployeeDialog(employee: Employee): void {
    const dialogRef = this.dialog.open(EditEmployeeComponent, {
      width: '400px',
      data: { employee }
    });
    dialogRef.afterClosed().subscribe(result => {
      // if (result) {
      //   const updatedEmployeeIndex = this.employees.findIndex(emp => emp.id === result.id);
      //   if (updatedEmployeeIndex !== -1) {
      //     this.employees[updatedEmployeeIndex] = result;
      //     this.dataSource = new MatTableDataSource(this.employees);
      //     this.dataSource.paginator = this.paginator;
      //     this.dataSource.sort = this.sort;
      //   }
      // }
      this.getEmployees()
    });
  }


}
