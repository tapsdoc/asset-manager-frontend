import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { routerTransition } from "../router.animations";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { finalize, Subscription } from "rxjs";
import { AuthService } from "../shared/services/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient } from "@angular/common/http";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]]
        });
    }

    loginUser() {
        this.authService
            .signin(this.loginForm.value)
            .subscribe(
                data => {
                    this.router.navigate(['/dashboard']).then();
                    this.snackBar.open(`User logged in!`, '', {
                        duration: 3000,
                        horizontalPosition: 'end',
                        verticalPosition: 'bottom'
                    });
                }, error => {
                    this.snackBar.open(`Invalid credentials!`, '', {
                        duration: 3000,
                        horizontalPosition: 'end',
                        verticalPosition: 'bottom'
                    });
                }
            );
    }

    private initFormBuilder() {
        this.loginForm = this.formBuilder.group({
            email: ['', [
                Validators.required,
            ]],
            password: ['', [
                Validators.required,
            ]],
        });
    }
}
