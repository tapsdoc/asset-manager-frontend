import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AssetHistory } from "../models/asset-history.model";

@Injectable({
    providedIn: 'root'
})
export class AssetHistoryService {

    private url: string = "http://localhost:8080/api/v1/asset-history";

    constructor(private http: HttpClient) { }

    getHistory(): Observable<AssetHistory[]> {
        return this.http.get<AssetHistory[]>(`${this.url}/all`);
    }
}
