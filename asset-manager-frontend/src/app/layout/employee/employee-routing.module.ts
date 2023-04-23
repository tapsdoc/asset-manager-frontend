import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AssetComponent } from "../asset/asset.component";
import { EmployeeComponent } from "./employee.component";

const routes: Routes = [
    { path: 'employee', component: EmployeeComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmployeeRoutingModule { }
