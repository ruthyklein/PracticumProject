import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { EmployeesTableComponent } from './components/employees-table/employees-table.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { AddPositionComponent } from './components/add-position/add-position.component';

export const routes: Routes = [
    { path: '**', component: HomepageComponent },
    { path: 'employees', component: EmployeesTableComponent },
    { path: 'addEmployee', component: AddEmployeeComponent },
    { path: 'editEmployee/:id', component: EditEmployeeComponent },
    { path: 'addPositionEmployee/:id', component: AddPositionComponent },
        //{ path: '**', component:NotFoundComponent },
    { path: '', redirectTo: 'employees', pathMatch: 'full' },



];