import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbAlertModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { StatModule } from '../../shared';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AssetModule } from "../asset/asset.module";
import { AssetHistoryModule } from "../asset-history/asset-history.module";

@NgModule({
    imports: [CommonModule, NgbCarouselModule, NgbAlertModule, DashboardRoutingModule, StatModule, AssetModule, AssetHistoryModule],
    declarations: [DashboardComponent]
})
export class DashboardModule {}
