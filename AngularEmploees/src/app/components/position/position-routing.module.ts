import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { PositionListComponent } from './position-list/position-list.component';

const RECIPE_ROUTES: Route[] = [
    { path: '', redirectTo: 'all', pathMatch: 'full' },
    { path: 'all', component: PositionListComponent }, 
   
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(RECIPE_ROUTES)
  ],
  exports: [RouterModule]

})
export class PositionRoutingModule { }
