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
