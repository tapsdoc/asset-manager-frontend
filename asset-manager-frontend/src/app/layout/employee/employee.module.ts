import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../../shared/modules/material.module";
import { EmployeeComponent } from "./employee.component";
import { EmployeeService } from "../../shared/services/employee.service";
import { EmployeeRoutingModule } from "./employee-routing.module";

@NgModule({
    imports: [CommonModule, MaterialModule, EmployeeRoutingModule],
    declarations: [EmployeeComponent],
    exports: [EmployeeComponent],
    providers: [EmployeeService],
})
export class EmployeeModule { }
