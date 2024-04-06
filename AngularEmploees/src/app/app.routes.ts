import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';

export const routes: Routes = [
    // { path: '', redirectTo: 'home', pathMatch: 'full' },
    // { path: 'home', loadComponent: () => import('./components/home-page/home-page.component').then(c => c.HomePageComponent) },
    // { path: 'employee', loadChildren: () => import('./components/recipe/recipe.module').then(c => c.RecipeModule) },
    // { path: '**', component: NotFoundComponent }


    { path: '', redirectTo: 'employee', pathMatch: 'full' },
    // { path: 'employee', loadChildren: () => import('./components/employee/employee.module').then(m => m.EmployeeModule) },
    // { path: 'position', loadChildren: () => import('./components/position/position.module').then(m => m.PositionModule) }
    { path: '**', component: HomepageComponent }];

