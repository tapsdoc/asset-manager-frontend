import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { AssetHistory } from "../../shared/models/asset-history.model";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { AssetHistoryService } from "../../shared/services/asset-history.service";
import { Subscription } from "rxjs";

@Component({
    selector: "app-asset-history",
    templateUrl: "./asset-history.component.html",
    styleUrls: ["./asset-history.component.scss"]
})
export class AssetHistoryComponent implements OnInit, AfterViewInit, OnDestroy {

    history: AssetHistory[] = [];
    private subs: Subscription;
    displayedColumns: string[] = ['id', 'asset', 'action', 'note', 'isAssigned', 'isDamaged', 'isReturned', 'actionDate'];
    dataSource: MatTableDataSource<AssetHistory> = new MatTableDataSource();

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private assetHistoryService: AssetHistoryService) { }

    ngOnInit(): void {
        this.subs = this.assetHistoryService.getHistory().subscribe(
            data => {
                this.history = data;
                this.dataSource.data = data;
            }
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
