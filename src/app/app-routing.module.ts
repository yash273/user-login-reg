import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserloginComponent } from './user/userlogin/userlogin.component';
import { UserregisterComponent } from './user/userregister/userregister.component';
import { UserlistComponent } from './user/userlist/userlist.component';

const routes: Routes = [
  {
    path:'login',
    component:UserloginComponent
  },
  {
    path:'register',
    component:UserregisterComponent
  },
  {
    path:'userlist',
    component:UserlistComponent
  },
  {
    path:'', 
    redirectTo:'login',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
