import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import {MaterialModule} from '../shared/modules/material.module';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    imports: [CommonModule, TranslateModule, SignupRoutingModule, MaterialModule, ReactiveFormsModule],
    declarations: [SignupComponent]
})
export class SignupModule {}
