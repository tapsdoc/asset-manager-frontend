import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AssetComponent } from "./asset.component";
import { AssetService } from "../../shared/services/asset.service";
import { AssetRoutingModule } from "./asset-routing.module";
import { MaterialModule } from "../../shared/modules/material.module";
import { RecentAssetComponent } from "./recent/recent-asset.component";
import { CreateAssetComponent } from "./create-asset/create-asset.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
    imports: [CommonModule, MaterialModule, AssetRoutingModule, ReactiveFormsModule, FlexLayoutModule],
    declarations: [AssetComponent, RecentAssetComponent, CreateAssetComponent],
    exports: [AssetComponent, RecentAssetComponent],
    providers: [AssetService],
})
export class AssetModule { }
