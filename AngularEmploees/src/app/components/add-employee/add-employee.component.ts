import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { PositionService } from '../../services/position.service';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Position } from '../../models/position.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddPositionComponent } from '../add-position/add-position.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Observable, catchError, debounceTime, map, of, switchMap } from 'rxjs';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [      
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatTooltipModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatExpansionModule  
  ],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})
export class AddEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  positionList: Position[];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddEmployeeComponent>,
    private employeeService: EmployeeService,
    private positionService: PositionService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
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
  
  initializeForm(): void {
    this.employeeForm = this.fb.group({
      idNumber: ['', {
        validators: [Validators.required, Validators.pattern(/^\d{9}$/)],
        asyncValidators: [this.idNumberValidator()],
        updateOn: 'blur'
      }],
      firstName: ['', [Validators.required, Validators.pattern(/^[\p{L}\s]{2,}$/u)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[\p{L}\s]{2,}$/u)]],      
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      startOfWorkDate: ['', Validators.required],
      positionList: this.fb.array([], Validators.required)
    });
  }

  get positionsFormArray(): FormArray {
    return this.employeeForm.get('positionList') as FormArray;
  }

  loadPositions(): void {
    this.positionService.getPositions().subscribe(
      positionList => {
        this.positionList = positionList;
        this.addPositionControl();
        const positionIndex = this.positionsFormArray.length - 1; 
        const positionFormGroup = this.positionsFormArray.at(positionIndex);
        const addedPositionId = positionFormGroup.get('positionId').value;
        if (addedPositionId) {
          const selectedPosition = this.positionList.find(pos => pos.id === addedPositionId);
          if (selectedPosition) {
            positionFormGroup.patchValue({ positionId: selectedPosition.id });
          }
        }
      },
      error => {
        this.openErrorSnackBar('Error loading positions');
      }
    );
  }

  addPositionControl(): void {
    if (this.positionList.length > 0) {
      this.positionsFormArray.push(this.fb.group({
        positionId: ['', Validators.required],
        isAdministrative: [false],
        entryDate: [null, Validators.required]
      }));
    }
  }

  removePositionControl(index: number): void {
    this.positionsFormArray.removeAt(index);
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
    this.positionsFormArray.controls.forEach((control: FormGroup) => {
      const workDate = this.employeeForm.get('startOfWorkDate').value;
      const entryDate = control.get('entryDate').value;

      if (workDate && entryDate && entryDate < workDate) {
        control.get('entryDate').setErrors({ entryDateBeforeWorkDate: true });
      } else {
        control.get('entryDate').setErrors(null);
      }
    });
  }
 
  idNumberValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const idNumber = control.value;
      return this.employeeService.getEmployees().pipe(
        map(employees => {
          const idExists = employees.some(employee => employee.idNumber === idNumber);
          return idExists ? { idNumberExists: true } : null;
        }),
        catchError(() => of(null)) 
      );
    };
  }
  submit(): void {
    if (this.employeeForm.valid) {
      const formData = this.employeeForm.value;
      this.employeeService.addEmployee(formData).subscribe({
        next: () => {
          this.openSuccessSnackBar('Employee added successfully');
          this.dialogRef.close(true);
        },
        error: (error) => {
          this.openErrorSnackBar('Error adding employee');        }
      });
    } else {
      this.openErrorSnackBar('Please fill in all required fields');
    }
  }

  openSuccessSnackBar(message: string): void {
    this._snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }
  openErrorSnackBar(message: string): void {
    this._snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }

  openAddPositionDialog(index: number): void {
    const dialogRef = this.dialog.open(AddPositionComponent, {
      disableClose: true
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.loadPositions();
        const positionFormGroup = this.positionsFormArray.at(index);
        positionFormGroup.patchValue({ positionId: result.id }); 
      }
    });
  
    dialogRef.componentInstance.index = index;
    dialogRef.componentInstance.positionAdded.subscribe((addedPosition: Position) => {
      if (addedPosition) {
        const positionIndex = this.positionList.findIndex(pos => pos.id === addedPosition.id);
        if (positionIndex !== -1) {
          this.loadPositions(); 
          const positionFormGroup = this.positionsFormArray.at(index);
          positionFormGroup.patchValue({ positionId: addedPosition.id });
        }
      }
    });
  }
  
  cancel(): void {
    this.dialogRef.close();
  }

  sortedPositions(): Position[] {
    return this.positionList.sort((a, b) => a.name.localeCompare(b.name));
  }

  isPositionDisabled(positionId: number, index: number): boolean {
    const selectedPositions = this.employeeForm.value.positionList.map((pos: any) => pos.positionId);
    return selectedPositions.includes(positionId) && selectedPositions.indexOf(positionId) !== index;
  }
}