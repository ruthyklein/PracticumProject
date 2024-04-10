import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Position } from '../../../models/position.model';
import { PositionService } from '../../../services/position.service';
import { AddPositionComponent } from '../add-position/add-position.component';

@Component({
  selector: 'app-positions-card',
  standalone: true,
  imports: [MatCardModule,
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatDividerModule,
    MatTooltipModule,
  ],
  templateUrl: './positions-card.component.html',
  styleUrl: './positions-card.component.scss'
})
export class PositionsCardComponent implements OnInit {
  positions: Position[] = [];
  icons: string[] = [
    'diversity_1',
    'medical_services',
    'local_hospital',
    'support_agent',
    'vaccines',];

  constructor(
    private positionervice: PositionService,
    private dialog: MatDialog,
  ) { }
  ngOnInit(): void {
    this.loadPosition()

  }
  loadPosition() {
    this.positionervice.getPositions().subscribe((positions) => {
      this.positions = positions;
    });
  }
  toAddposition(): void {
    const dialogRef = this.dialog.open(AddPositionComponent, {
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadPosition();
    })
  }

}
