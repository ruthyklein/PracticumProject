import { Component } from '@angular/core';
import { TopBarComponent } from "../top-bar/top-bar.component";
import { EmployeesTableComponent } from '../employees-table/employees-table.component';
import { FooterComponent } from '../footer/footer.component';
@Component({
    selector: 'app-homepage',
    standalone: true,
    templateUrl: './homepage.component.html',
    styleUrl: './homepage.component.scss',
    imports: [TopBarComponent, EmployeesTableComponent,FooterComponent]
})
export class HomepageComponent {

}
