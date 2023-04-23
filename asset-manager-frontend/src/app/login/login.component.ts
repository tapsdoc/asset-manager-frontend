import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { finalize, Subscription } from "rxjs";
import { AuthService } from "../shared/services/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    form: FormGroup;
    message: string;
    loginSubscription: Subscription;
    loginLoading = false;

    constructor(
        private authService: AuthService,
        public formBuilder: FormBuilder,
        private router: Router,
        public snackBar: MatSnackBar
    ) {
        this.initFormBuilder();
    }

    ngOnInit() {
    }

    loginUser() {
        this.loginLoading = true;

        this.loginSubscription = this.authService
            .login(this.form.value)
            .pipe(finalize(() => this.loginLoading = false))
            .subscribe(
                data => {
                    this.router.navigate(['/dashboard']).then();
                },
                error => {
                    this.snackBar.open('Invalid credentials', '', {
                        duration: 3000,
                        horizontalPosition: 'end',
                        verticalPosition: 'bottom'
                    });
                }
            );
    }

    private initFormBuilder() {
        this.form = this.formBuilder.group({
            email: ['', [
                Validators.required,
                Validators.email
            ]],
            password: ['', Validators.required]
        });
    }
}
