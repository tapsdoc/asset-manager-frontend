import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { AssetHistoryComponent } from "./asset-history.component";

const routes: Routes = [
    {
        path: 'asset-history',
        component: AssetHistoryComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AssetHistoryRoutingModule {

}
