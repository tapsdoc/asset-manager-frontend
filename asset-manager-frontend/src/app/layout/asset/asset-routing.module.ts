import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { AssetComponent } from "./asset.component";
import { RecentAssetComponent } from "./recent/recent-asset.component";
import { CreateAssetComponent } from "./create-asset/create-asset.component";

const routes: Routes = [
    { path: '', component: AssetComponent },
    { path: 'recent-asset', component: RecentAssetComponent },
    { path: 'add', component: CreateAssetComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AssetRoutingModule { }
