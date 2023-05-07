import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../shared/modules/material.module";

@NgModule({
  imports: [CommonModule, TranslateModule, LoginRoutingModule, ReactiveFormsModule, MaterialModule],
    declarations: [LoginComponent]
})
export class LoginModule {}
