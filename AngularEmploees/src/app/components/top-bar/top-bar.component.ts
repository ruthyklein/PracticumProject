import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EmployeeService } from '../../services/employee.service';
import { ExcelService } from '../../services/excel.service';
import { Employee } from '../../models/employee.model';
import { AddEmployeeComponent } from '../employee/add-employee/add-employee.component';
import { EmployeesTableComponent } from '../employee/employees-table/employees-table.component';
import { DatePipe } from '@angular/common';
import { AddPositionComponent } from '../position/add-position/add-position.component';
import { PositionsCardComponent } from '../position/positions-card/positions-card.component';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    EmployeesTableComponent, 
    MatListModule,
    MatDividerModule,
    DatePipe,
    MatMenuModule,
    MatTooltipModule,

  ],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent implements OnInit {
  
  isMenuOpened: boolean = false;
  employees: Employee[] = [];

  constructor(
    private dialog: MatDialog,
    private excelService: ExcelService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.getEmployees(); // Fetch employees on component initialization
  }

  toggleSidebar() {
    this.isMenuOpened = !this.isMenuOpened;
  }

  openAddDialog() {
    this.dialog.open(AddEmployeeComponent ,{ width: '800px' });
  }
  openPositionCardsDialog(){
    this.dialog.open(PositionsCardComponent,{ width: '800' });
  }
  exportToExcel() {
    this.employeeService.getEmployees().subscribe((employees: Employee[]) => {
      const currentDateTime = new Date().toISOString()
        .slice(0, 16)
        .replace(/[-T:]/g, '')
        .replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/, '$3-$2-$1_$4$5');
      const fileName = `employee_data_${currentDateTime}`;
      this.excelService.exportToExcel(employees, fileName);
    });
  }

  openAddPositionDialog() {
    this.dialog.open(AddPositionComponent, { width: '800' });
  }
  getEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (res: Employee[]) => {
        this.employees = res;
        console.log("Employees fetched successfully:");
        console.log(this.employees);
      },
      error: (err) => {
        console.error('Error fetching employees:', err);
      }
    });
  }
  onHoverEffect(event: MouseEvent) {
    const button = event.target as HTMLElement;
    button.classList.remove('normal-state');
    button.classList.add('hover-effect');
}

onMouseLeave(event: MouseEvent) {
    const button = event.target as HTMLElement;
    button.classList.remove('hover-effect');
    button.classList.add('normal-state');
}
  

  
}
