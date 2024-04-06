import { Component, OnInit } from '@angular/core';
import { Position } from '../../models/position.model';
import { PositionService } from '../../services/position.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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

  constructor(
    private positionService: PositionService,
    private dialogRef: MatDialogRef<AddPositionComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.positionForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  submit(): void {
    if (this.positionForm.valid) {
      console.log("try to add position:", this.positionForm.value);
      
      this.positionService.addPosition(this.positionForm.value).subscribe(
        (addedPosition: Position) => {
          console.log('Position added successfully:', addedPosition);
          this.dialogRef.close(true);
        },
        error => {
          console.error('Error adding position:', error);
          // Handle error here
        }
      );
    } else {
      // Mark all fields as touched to display validation errors
      this.positionForm.markAllAsTouched();
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}