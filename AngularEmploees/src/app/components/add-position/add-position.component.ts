import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Position } from '../../models/position.model';
import { PositionService } from '../../services/position.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-position',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,MatInputModule,MatFormFieldModule,MatButtonModule,MatDialogModule],
  templateUrl: './add-position.component.html',
  styleUrl: './add-position.component.scss'
})
export class AddPositionComponent  implements OnInit {
  positionForm: FormGroup;
  position: Position = new Position();
  @Input() index: number;
  @Output() positionAdded = new EventEmitter<{position: Position, index: number}>();
  

  constructor(
    private positionService: PositionService,
    private dialogRef: MatDialogRef<AddPositionComponent>,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.positionForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
    });
  }

  submit(): void {
    if (this.positionForm.valid) { 
        this.positionService.addPosition(this.positionForm.value).subscribe(
        (addedPosition: Position) => {
          this.positionAdded.emit({ position: addedPosition, index: this.index });
          this.openSuccessSnackBar('Position added successfully');
          this.dialogRef.close(addedPosition);
        },
        error => {
          this.openErrorSnackBar('Error adding position');
        }
      );
    } else {
      this.openErrorSnackBar('Please fill in all required fields');
      this.positionForm.markAllAsTouched();
    }
  }
  
  cancel(): void {
    this.dialogRef.close();
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
}