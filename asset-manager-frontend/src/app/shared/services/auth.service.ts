import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private apiUrl = 'http://localhost:8080/api/v1/auth';

    constructor(private http: HttpClient) {}

    register(form: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, form);
    }

    signin(credentials: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`, credentials);
    }
}
