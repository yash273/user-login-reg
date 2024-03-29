import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'postlist',
    loadChildren: () => import('./jsonplaceholder/post-list/post-list.module').then(m => m.PostListModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'weather',
    loadChildren: () => import('./weather/weather.module').then(m => m.WeatherModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'products',
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'chart',
    loadChildren: () => import('./organization-chart/organization-chart.module').then(m => m.OrganizationChartModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'assessment',
    loadChildren: () => import('./assessment/assessment.module').then(m => m.AssessmentModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'user',
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'employee',
    loadChildren: () => import('./modules/employee/employee.module').then(m => m.EmployeeModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'users',
    loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'users-parent-child',
    loadChildren: () => import('./modules/parent-child-user/parent-child-user.module').then(m => m.ParentChildUserModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'create-form',
    loadChildren: () => import('./modules/dynamic-form/dynamic-form.module').then(m => m.DynamicFormModule),
    canLoad: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
