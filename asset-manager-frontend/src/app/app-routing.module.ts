import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./layout/layout.module').then((m) => m.LayoutModule)
    },
    { path: 'login', loadChildren: () => import('./login/login.module').then((m) => m.LoginModule) },
    { path: 'signup', loadChildren: () => import('./signup/signup.module').then((m) => m.SignupModule) },
    { path: 'not-found', loadChildren: () => import('./not-found/not-found.module').then((m) => m.NotFoundModule) },
    { path: '**', redirectTo: 'not-found' }
]

@NgModule({
    imports: [RouterModule.forRoot(routes, {})],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule {}
