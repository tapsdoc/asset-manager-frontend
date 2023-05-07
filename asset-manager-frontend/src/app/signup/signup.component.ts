import { Component, OnInit } from "@angular/core";
import { routerTransition } from '../router.animations';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { Subscription } from "rxjs";
import { AuthService } from "../shared/services/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl, form: FormGroupDirective | NgForm | null): boolean {
        const password = control.parent?.get('password')?.value;
        const confirmation = control.parent?.get('passwordConfirmation')?.value;
        const match = password !== confirmation;

        return (control && control.dirty && match) || (control && control.touched && control.invalid);
    }
}

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {
    form: FormGroup;
    matcher = new MyErrorStateMatcher();
    registerSubscription: Subscription;

    constructor(
        private authService: AuthService,
        public formBuilder: FormBuilder,
        public snackBar: MatSnackBar,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        this.initFormBuilder();
    }

    ngOnInit() {
    }

    registerUser() {
        this.registerSubscription = this.authService
            .register(this.form.value)
            .subscribe(
                data => {
                    this.router.navigate(['/login'], { relativeTo: this.route }).then();
                    this.snackBar.open(`User Registered! Now, you can login`, '', {
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
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ]],
            password: ['', [
                Validators.required,
                this.regexValidator(new RegExp('(?=.*?[0-9])'), { 'at-least-one-digit': true }),
                this.regexValidator(new RegExp('(?=.*[a-z])'), { 'at-least-one-lowercase': true }),
                this.regexValidator(new RegExp('(?=.*[A-Z])'), { 'at-least-one-uppercase': true }),
                this.regexValidator(new RegExp('(?=.*[!@#$%^&*])'), { 'at-least-one-special-character': true }),
                this.regexValidator(new RegExp('(^.{8,}$)'), { 'at-least-eight-characters': true }),
            ]],
            passwordConfirmation: ['', Validators.required]
        }, { validator: this.checkPasswords });
    }

    private checkPasswords(group: FormGroup) { // here we have the 'passwords' group
        const pass = group.controls['password'].value;
        const confirmPass = group.controls['passwordConfirmation'].value;
        return pass === confirmPass ? null : { notSame: true };
    }

    private regexValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            if (!control.value) {
                return null;
            }
            const valid = regex.test(control.value);
            return valid ? null : error;
        };
    }

    updateValidationStatus(controlName: string): void {
        const control = this.form.get(controlName);
        if (control) {
            control.markAsTouched();
            control.markAsDirty();
        }
    }
}
