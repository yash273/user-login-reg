import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { MaterialModule } from '../material/material.module';
import { UserModule } from './user/user.module'
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [
    HomeComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    UserModule,
    RouterModule,
  ]
})
export class HomeModule { }
