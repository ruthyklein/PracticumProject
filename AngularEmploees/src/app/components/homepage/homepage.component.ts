import { Component } from '@angular/core';
import { EmployeesTableComponent } from '../employee/employees-table/employees-table.component';
import { FooterComponent } from '../footer/footer.component';
import { TopBarComponent } from "../top-bar/top-bar.component";
@Component({
    selector: 'app-homepage',
    standalone: true,
    templateUrl: './homepage.component.html',
    styleUrl: './homepage.component.scss',
    imports: [TopBarComponent,
        EmployeesTableComponent,
        FooterComponent]
})
export class HomepageComponent {

}
