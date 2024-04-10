import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from '../../../services/employee.service';
import { Employee } from '../../../models/employee.model';

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
export class DeleteEmployeeComponent {
  employee: Employee;

  constructor(
    public dialogRef: MatDialogRef<DeleteEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) data: { employee: Employee },
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar
  ) {
    this.employee = data.employee;
  }

  onConfirmDelete(): void {
    this.employeeService.deleteEmployee(this.employee.id).subscribe(() => {
      this.openSnackBar('Employee deleted successfully');
      this.dialogRef.close(true);
    }, error => {
      this.openErrorSnackBar('Error deleting employee: ' + error.message);
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, undefined, {
      duration: 2000,
      panelClass: ['custom-snackbar']
    });
  }

  openErrorSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }
}