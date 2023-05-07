import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Asset } from "../models/asset.model";

@Injectable({
    providedIn: 'root'
})
export class AssetService {

    private url: string = "http://localhost:8080/api/v1/asset";

    constructor(private http: HttpClient) { }

    addAsset(form: FormData): Observable<any> {
        return this.http.post(`${this.url}/add`, form);
    }

    editAsset(id: bigint, form: any): Observable<any> {
        return this.http.put(`${this.url}/edit/` + id, form);
    }

    delete(id: bigint): void {
        this.http.delete(`${this.url}/delete/` + id);
    }

    viewAsset(id: bigint): Observable<Asset> {
        return this.http.get<Asset>(`${this.url}/get`)
    }
    getAllAssets(): Observable<Asset[]> {
        return this.http.get<Asset[]>(`${this.url}/all`);
    }

    numberOfAssets(): Observable<{Assets: number}> {
        return this.http.get<{ Assets: number }>(`${this.url}/number-of-assets`);
    }

    numberOfAssignedAssets(): Observable<{Assigned: number}> {
        return this.http.get<{ Assigned: number }>(`${this.url}/number-of-assigned`);
    }

    numberOfUnassignedAssets(): Observable<{Unassigned: number}> {
        return this.http.get<{ Unassigned: number }>(`${this.url}/number-of-unassigned`);
    }
}
