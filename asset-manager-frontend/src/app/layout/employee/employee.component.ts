import { Component, OnDestroy, OnInit } from "@angular/core";
import { EmployeeService } from "../../shared/services/employee.service";

@Component({
    selector: 'app-employee',
    templateUrl: 'employee.component.html',
    styleUrls: ['employee.component.scss']
})
export class EmployeeComponent implements OnInit, OnDestroy {

    constructor(private employeeService: EmployeeService) { }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }

}
