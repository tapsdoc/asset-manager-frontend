import { NgModule } from "@angular/core";
import { AssetHistoryComponent } from "./asset-history.component";
import { CommonModule } from "@angular/common";
import { AssetHistoryService } from "../../shared/services/asset-history.service";
import { MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { AssetHistoryRoutingModule } from "./asset-history-routing.module";

@NgModule({
    imports: [CommonModule, MatTableModule, MatFormFieldModule, MatInputModule, MatSortModule, MatPaginatorModule, AssetHistoryRoutingModule],
    declarations: [AssetHistoryComponent],
    exports: [AssetHistoryComponent],
    providers: [AssetHistoryService],
})
export class AssetHistoryModule { }
