import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            {
                path: 'dashboard',
                loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule)
            },
            { path: 'asset', loadChildren: () => import('./asset/asset.module').then((m) => m.AssetModule) },
            { path: 'asset-history', loadChildren: () => import('./asset-history/asset-history.module').then((m) => m.AssetHistoryModule) },
            { path: 'employee', loadChildren: () => import('./employee/employee.module').then((m)=> m.EmployeeModule) }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
