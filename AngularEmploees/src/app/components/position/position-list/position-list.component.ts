import { Component, OnInit } from '@angular/core';
import { Position } from '../../../models/position.model';
import { PositionService } from '../../../services/position.service';

@Component({
  selector: 'app-position-list',
  templateUrl: './position-list.component.html',
  styleUrl: './position-list.component.scss'
})
export class PositionListComponent implements OnInit {
  positions!: Position[];

  constructor(private positionService: PositionService) { }

  ngOnInit(): void {
    this.positionService.getPositions()
      .subscribe(positions => this.positions = positions);
  }
}