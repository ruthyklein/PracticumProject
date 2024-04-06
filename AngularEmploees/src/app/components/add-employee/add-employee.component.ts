import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { Employee } from '../../models/employee.model';
import { map } from 'rxjs';
import { AddPositionComponent } from '../add-position/add-position.component';

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
    private dialog: MatDialog
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
        this.addPositionControl();
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
  }

  removePositionControl(index: number): void {
    this.positionsFormArray.removeAt(index);
  }

  isPositionDisabled(positionId: number, index: number): boolean {
    const selectedPositions = this.employeeForm.value.positionList.map((pos: any) => pos.positionId);
    return selectedPositions.includes(positionId) && selectedPositions.indexOf(positionId) !== index;
  }
  openAddPositionDialog(): void {
    const dialogRef = this.dialog.open(AddPositionComponent, {
      width: '400px',
      disableClose: true
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // הוספת התפקיד שנבחר בדיאלוג למערך התפקידים
        this.positionList.push(result);
        // קביעת התפקיד שנבחר בדיאלוג כתפקיד שנבחר ב-select
        this.employeeForm.get('positionList').setValue([...this.employeeForm.get('positionList').value, result.id]);
      }
    });
  }
  
  /*submit(): void {
    if (this.employeeForm.valid) {
      const formData: Employee = this.employeeForm.value;
      this.employeeService.addEmployee(formData).subscribe(
        () => {
          console.log('Employee added successfully.');
          this.dialogRef.close(true);
        },
        error => {
          console.error('Error adding employee:', error);
          if (error.error && error.error.errors) {
            console.error('Validation errors:', error.error.errors);
          }
        }
      );
    } else {
      this.employeeForm.markAllAsTouched();
    }
  }*/
  submit(): void {
    if (this.employeeForm.valid) {
      const formData: any = this.employeeForm.value;
      this.employeeService.addEmployee(formData).subscribe(
        (newEmployee: any) => {
          console.log('Employee added successfully:', newEmployee);
          this.dialogRef.close(true);
        },
        error => {
          console.error('Error adding employee:', error);
          if (error.error && error.error.errors) {
            console.error('Validation errors:', error.error.errors);
          }
        }
      );
    } else {
      console.log('the form isnot valid');
      this.employeeForm.markAllAsTouched();
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}


