import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserloginComponent } from './userlogin/userlogin.component';
import { UserregisterComponent } from './userregister/userregister.component';
import { UserlistComponent } from './userlist/userlist.component';

const routes: Routes = [
  {
    path: 'login',
    component: UserloginComponent
  },
  {
    path: 'register',
    component: UserregisterComponent
  },
  {
    path: 'userlist',
    component: UserlistComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
