import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Employee } from '../../../models/employee.model';
import { Position } from '../../../models/position.model';
import { EmployeeService } from '../../../services/employee.service';
import { PositionService } from '../../../services/position.service';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatExpansionModule
  ],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.scss'
})
export class EditEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  positionList: Position[];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditEmployeeComponent>,
    private employeeService: EmployeeService,
    private positionService: PositionService,
    @Inject(MAT_DIALOG_DATA) public data: { employee: Employee },
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const employee = this.data.employee;
    this.initializeForm(employee);
    this.loadPositions();
    this.employeeForm.get('dateOfBirth').valueChanges.subscribe(() => {
      this.validateAge();
    });

    this.employeeForm.get('startOfWorkDate').valueChanges.subscribe(() => {
      this.validateStartOfWorkDate();
    });

    this.employeeForm.get('positionList').valueChanges.subscribe(() => {
      this.validateEntryDates();
    });
  }

  initializeForm(employee: Employee): void {
    this.employeeForm = this.fb.group({
      idNumber: [employee.idNumber,[Validators.required, Validators.pattern(/^\d{9}$/)]],
      firstName: [employee.firstName, [Validators.required, Validators.pattern(/^[\p{L}\s]{2,}$/u)]],
      lastName: [employee.lastName, [Validators.required, Validators.pattern(/^[\p{L}\s]{2,}$/u)]],
      gender: [employee.gender, Validators.required],
      dateOfBirth: [employee.dateOfBirth, Validators.required],
      startOfWorkDate: [employee.startOfWorkDate, Validators.required],
      positionList: this.fb.array([], Validators.required)
    });
    this.patchPositionValue(employee);
  }

  get positionsFormArray(): FormArray {
    return this.employeeForm.get('positionList') as FormArray;
  }

  loadPositions(): void {
    this.positionService.getPositions().subscribe(
      positionList => {
        this.positionList = positionList;
      },
      error => {
        this.openSnackBar('Error loading positions: ' + error.message);
      }
    );
  }

  addPositionControl(): void {
    this.positionsFormArray.push(this.fb.group({
      positionId: ['', Validators.required],
      isAdministrative: [false, Validators.required],
      entryDate: [null, Validators.required]
    }));
    this.populatePositionOptions(this.positionsFormArray.length - 1);
  }

  populatePositionOptions(index: number): void {
    const positionControl = this.positionsFormArray.at(index).get('positionId');
    if (positionControl && this.positionList.length > 0) {
      positionControl.setValue(this.positionList[0].name);
    }
  }

  patchPositionValue(employee: Employee): void {
    const positionsFormArray = this.employeeForm.get('positionList') as FormArray;
    employee.positionList.forEach(position => {
      positionsFormArray.push(this.fb.group({
        positionId: [position.position.id, Validators.required],
        isAdministrative: [position.isAdministrative, Validators.required],
        entryDate: [position.entryDate, Validators.required]
      }));
    });
  }

  removePositionControl(index: number): void {
    this.positionsFormArray.removeAt(index);
  }

  isPositionDisabled(positionId: number, index: number): boolean {
    const selectedPositions = this.employeeForm.value.positionList.map((pos: any) => pos.positionId);
    return selectedPositions.includes(positionId) && selectedPositions.indexOf(positionId) !== index;
  }
  
  validateAge(): void {
    if (this.employeeForm.get('dateOfBirth').valid) {
      const birthDate: Date = this.employeeForm.get('dateOfBirth').value;
      const eighteenYearsAgo = new Date();
      eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

      if (birthDate > eighteenYearsAgo) {
        this.employeeForm.get('dateOfBirth').setErrors({ overAge: true });
      } else {
        this.employeeForm.get('dateOfBirth').setErrors(null);
      }
    }
  }

  validateStartOfWorkDate(): void {
    const startOfWorkDate: Date = this.employeeForm.get('startOfWorkDate').value;
    const dateOfBirth: Date = this.employeeForm.get('dateOfBirth').value;
  
    if (startOfWorkDate < dateOfBirth) {
      this.employeeForm.get('startOfWorkDate').setErrors({ beforeDateOfBirth: true });
    } else {
      this.employeeForm.get('startOfWorkDate').setErrors(null);
    }
  }
  
  validateEntryDates(): void {
    const startOfWorkDate: Date = this.employeeForm.get('startOfWorkDate').value;
    this.positionsFormArray.controls.forEach((control: FormGroup) => {
      const entryDate: Date = control.get('entryDate').value;
  
      if (startOfWorkDate && entryDate && entryDate < startOfWorkDate) {
        control.get('entryDate').setErrors({ entryDateBeforeWorkDate: true });
      } else {
        control.get('entryDate').setErrors(null);
      }
    });
  }
  
  submit(): void {
    if (this.employeeForm.valid) {
      const formData = {
        idNumber: this.employeeForm.value.idNumber,
        firstName: this.employeeForm.value.firstName,
        lastName: this.employeeForm.value.lastName,
        gender: this.employeeForm.value.gender,
        dateOfBirth: this.employeeForm.value.dateOfBirth,
        startOfWorkDate: this.employeeForm.value.startOfWorkDate,
        positionList: this.employeeForm.value.positionList
      };

      this.updateEmployee(formData);
    } else {
      this.employeeForm.markAllAsTouched();
    }
  }

  updateEmployee(formData: any): void {
    const employeeId = this.data.employee.id;
    formData.id = employeeId;
    this.employeeService.updateEmployee(formData).subscribe(
      response => {
        this.openSnackBar('Employee updated successfully');
        this.dialogRef.close(true);
      },
      error => {
        this.openErrorSnackBar('Failed to update employee: ' + error.message);
      }
    );
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  comparePositions(o1: Position, o2: Position): boolean {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
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