import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { AssetService } from "../../shared/services/asset.service";
import { Asset } from "../../shared/models/asset.model";
import { MatDialog } from "@angular/material/dialog";
import { CreateAssetComponent } from "./create-asset/create-asset.component";

@Component({
    selector: 'app-asset',
    templateUrl: 'asset.component.html',
    styleUrls: ['asset.component.scss']
})
export class AssetComponent implements OnInit, AfterViewInit, OnDestroy {

    assets: Asset[];
    private subs: Subscription;
    assetId: string;
    name: string;
    assetModelNumber: string;
    serialNumber: string;
    image: string;

    displayedColumns: string[] = [
        'assetId',
        'name',
        'assetModelNumber',
        'price',
        'dateOfPurchase',
        'action'
    ];
    dataSource: MatTableDataSource<Asset> = new MatTableDataSource();

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(public dialog: MatDialog, private assetHistoryService: AssetService) { }

    ngOnInit(): void {
        this.subs = this.assetHistoryService.getAllAssets().subscribe(
            data => {
                this.assets = data;
                this.dataSource.data = data;
            }
        )
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    getAllAssets() {
        this.assetHistoryService.getAllAssets().subscribe(
            data => {
                this.assets = data;
                this.dataSource.data = data;
            }
        );
    }

    addAsset() {
        const dialogRef = this.dialog.open(CreateAssetComponent);
        dialogRef.afterClosed().subscribe(
            data => {
                if (data === 'add') {
                    this.getAllAssets();
                }
            }
        );
    }

    editAsset(row: any) {
        this.dialog.open(CreateAssetComponent, {data:row}).afterClosed().subscribe(
            val => {
                if (val === 'edit') {
                    this.getAllAssets();
                }
            }
        );
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
