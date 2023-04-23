import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private url: string = "http://localhost:8080/api/v1/user";

    constructor(private http: HttpClient) {
    }
}
