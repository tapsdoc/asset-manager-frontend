import { Component, OnDestroy, OnInit } from "@angular/core";
import { routerTransition } from '../../router.animations';
import { AssetService } from "../../shared/services/asset.service";
import { Subscription } from "rxjs";
import { EmployeeService } from "../../shared/services/employee.service";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit, OnDestroy {

    private subs: Subscription;
    data: number;
    assigned: number;
    unassigned: number;
    employees: number;

    constructor(private assetService: AssetService, private employeeService: EmployeeService) { }

    ngOnInit() {
        this.subs = this.assetService.numberOfAssets().subscribe(
            result => {
                this.data = result.Assets;
                console.log(result);
            },
            error => console.log(error)
        );

        this.subs = this.assetService.numberOfAssignedAssets().subscribe(
            result => {
                this.assigned = result.Assigned;
                console.log(result);
            }, error => console.log(error)
        );

        this.subs = this.assetService.numberOfUnassignedAssets().subscribe(
            result => {
                this.unassigned = result.Unassigned;
                console.log(result);
            }, error => console.log(error)
        );

        this.subs = this.employeeService.numberOfEmployees().subscribe(
            result => {
                this.employees = result.Employees;
                console.log(result);
            }, error => console.log(error)
        );
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }
}
