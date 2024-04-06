import { Component, OnInit, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Employee } from '../../models/employee.model';
import { Position } from '../../models/position.model';
import { EmployeeService } from '../../services/employee.service';
import { PositionService } from '../../services/position.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
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

@Component({
  selector: 'app-edit-employee',
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
    @Inject(MAT_DIALOG_DATA) public data: { employee: Employee }
  ) { }

  ngOnInit(): void {
    const employee = this.data.employee;
    this.initializeForm(employee);
    this.loadPositions();
  }



  initializeForm(employee: Employee): void {
    this.employeeForm = this.fb.group({
      idNumber: [employee.idNumber, Validators.required],
      firstName: [employee.firstName, Validators.required],
      lastName: [employee.lastName, Validators.required],
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
        console.error('Error loading positions:', error);
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
    console.log(positionsFormArray, 'positionsFormArray  before pushing');
    employee.positionList.forEach(position => {
      positionsFormArray.push(this.fb.group({
        positionId: [position.position.id, Validators.required],
        isAdministrative: [position.isAdministrative, Validators.required],
        entryDate: [position.entryDate, Validators.required]
      }));
      console.log(positionsFormArray, 'positionsFormArray  after pushing');
    });
  }

  removePositionControl(index: number): void {
    this.positionsFormArray.removeAt(index);
  }

  isPositionDisabled(positionId: number, index: number): boolean {
    const selectedPositions = this.employeeForm.value.positionList.map((pos: any) => pos.positionId);
    return selectedPositions.includes(positionId) && selectedPositions.indexOf(positionId) !== index;
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
        console.log(formData);
        console.log('Employee updated successfully:', response);
        this.dialogRef.close(true);
      },
      error => {
        console.error('Failed to update employee:', error);
      }
    );
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  comparePositions(o1: Position, o2: Position): boolean {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }
}
