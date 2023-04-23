import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Asset } from "../../../shared/models/asset.model";
import { Subscription } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { AssetService } from "../../../shared/services/asset.service";

@Component({
    selector: 'app-recent-asset',
    templateUrl: 'recent-asset.component.html',
    styleUrls: ['recent-asset.component.scss']
})
export class RecentAssetComponent implements OnInit, AfterViewInit, OnDestroy{

    assets: Asset[];
    private subs: Subscription;
    displayedColumns: string[] = [
        'id',
        'assetId',
        'name',
        'assetModelNumber',
        'price',
        'dateOfPurchase'
    ];
    dataSource: MatTableDataSource<Asset> = new MatTableDataSource();

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private assetHistoryService: AssetService) { }

    ngOnInit(): void {
        this.subs = this.assetHistoryService.getAllAssets().subscribe(
            data => {
                this.assets = data;
                this.dataSource.data = data;
            }, error => console.log(error)
        )
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }
}
