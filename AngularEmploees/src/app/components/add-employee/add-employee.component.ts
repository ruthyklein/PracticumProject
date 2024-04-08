/*import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
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
import { Observable, map, of, switchMap } from 'rxjs';
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
    MatExpansionModule  ],
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
  }

  initializeForm(): void {
    this.employeeForm = this.fb.group({
      idNumber: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
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
        this.addPositionControl(); // שליחת רשימת התפקידים כארגומנט
      },
      error => {
        console.error('Error loading positions:', error);
      }
    );
  }
  addPositionControl(): void {
    if (this.positionList.length > 0) {
      this.positionsFormArray.push(this.fb.group({
        positionId: ['', Validators.required],
        isAdministrative: [false],
        entryDate: [null, Validators.required, this.entryDateAfterWorkDateValidator]
      }));
    }
  }
  entryDateAfterWorkDateValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    const workDate = (control.root as FormGroup).get('beginningOfWork')?.value;
    const entryDate = control.value;
    
    if (workDate < entryDate) {
      return of({ entryDateBeforeWorkDate: true }).pipe(
        map((error) => {
          return error;
        })
      );
    }
    return of(null);
  }


  removePositionControl(index: number): void {
    this.positionsFormArray.removeAt(index);
  }

  isPositionDisabled(positionId: number, index: number): boolean {
    const selectedPositions = this.employeeForm.value.positionList.map((pos: any) => pos.positionId);
    return selectedPositions.includes(positionId) && selectedPositions.indexOf(positionId) !== index;
  }
  sortedPositions(): any[] {
    return this.positionList.sort((a, b) => {
      // אם a קטן מ b, החזר -1, אם הם שווים, החזר 0, אחרת החזר 1
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
  }

submit(): void {
  if (this.employeeForm.valid) {
    const formData = this.employeeForm.value;
    this.employeeService.addEmployee(formData).subscribe({
      next: (newEmployee: Employee) => {
        // Instead of fetching all employees again, directly add the new employee to the local list
       // this.employeeService.employees.subscribe(employees => {
        //  employees.push(newEmployee);
       //   this.employeeService.employees.next(employees);});
        this.openSnackBar();
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.error('Error adding employee:', error);
        // Handle error as before
      }
    });
  } else {
    // Handle form validation errors as before
  }
}
  openErrorSnackBar(message: string): void {
    this._snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }
  openSnackBar() {
    const snackBarRef = this._snackBar.open('Employee added successfully', undefined, {
      duration: 2000,
      panelClass: ['custom-snackbar']
    });
    snackBarRef.afterDismissed().subscribe(() => {
    });
  }

    openAddPositionDialog(): void {
    const dialogRef = this.dialog.open(AddPositionComponent, {
        width: '400px',
        disableClose: true
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.loadPositions();
      }
    });
}

  
  updatePositionsSelect(newPositionId: number): void {
    const positionsFormArray = this.employeeForm.get('positionList') as FormArray;
    const positionIndex = positionsFormArray.controls.findIndex(control => control.value.positionId === 'other');
    if (positionIndex !== -1) {
      positionsFormArray.controls[positionIndex].get('positionId').setValue(newPositionId);
    }
  }


  cancel(): void {
    this.dialogRef.close();
  }
}

*/
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
      },
      error => {
        console.error('Error loading positions:', error);
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
        catchError(() => of(null)) // Catch error and return null if unable to fetch employees
      );
    };
  }
  submit(): void {
    if (this.employeeForm.valid) {
      const formData = this.employeeForm.value;
      this.employeeService.addEmployee(formData).subscribe({
        next: () => {
          this.openSnackBar();
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error('Error adding employee:', error);
        }
      });
    } else {
      // Handle form validation errors
    }
  }

  openSnackBar(): void {
    this._snackBar.open('Employee added successfully', undefined, {
      duration: 2000,
      panelClass: ['custom-snackbar']
    });
  }

  openAddPositionDialog(): void {
    const dialogRef = this.dialog.open(AddPositionComponent, {
      width: '400px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.loadPositions();
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