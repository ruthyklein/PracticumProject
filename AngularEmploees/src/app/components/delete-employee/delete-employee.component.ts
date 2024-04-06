import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-employee',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './delete-employee.component.html',
  styleUrl: './delete-employee.component.scss'
})
export class DeleteEmployeeComponent  {
  employee: Employee;

  constructor(
    public dialogRef: MatDialogRef<DeleteEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) data: { employee: Employee },
    private employeeService: EmployeeService
  ) { this.employee = data.employee; }

  onConfirmDelete(): void {
    this.employeeService.deleteEmployee(this.employee.id).subscribe(() => {
      console.log("Employee deleted successfully");
      this.dialogRef.close(true);
    }, error => {
      console.error("Error deleting employee:", error);
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}

