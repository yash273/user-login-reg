import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserloginComponent } from './user/userlogin/userlogin.component';
import { UserregisterComponent } from './user/userregister/userregister.component';

const routes: Routes = [
  {
    path:'login',
    component:UserloginComponent
  },
  {
    path:'register',
    component:UserregisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
