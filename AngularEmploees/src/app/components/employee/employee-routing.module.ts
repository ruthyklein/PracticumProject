import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { EmployeesTableComponent } from '../employees-table/employees-table.component';

const EMPLOYEE_ROUTES: Route[] = [
    { path: '', redirectTo: 'all', pathMatch: 'full' },
    { path: 'all', component: EmployeesTableComponent }, 
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(EMPLOYEE_ROUTES)
  ],
  exports: [RouterModule]

})
export class EmployeeRoutingModule { }
