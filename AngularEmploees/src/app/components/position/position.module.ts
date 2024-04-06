import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PositionRoutingModule } from './position-routing.module';
import { PositionListComponent } from './position-list/position-list.component';



@NgModule({
  declarations: [PositionListComponent],
  exports: [CommonModule,PositionRoutingModule],
  imports: [
    CommonModule
  ]
})
export class PositionModule { }
