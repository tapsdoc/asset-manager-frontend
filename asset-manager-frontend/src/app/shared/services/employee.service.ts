import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    private url: string = 'http://localhost:8080/api/v1/employee';

    constructor(private http: HttpClient) { }

    numberOfEmployees(): Observable<{Employees: number}> {
        return this.http.get<{ Employees: number }>(`${this.url}/number-of-employees`);
    }
}
