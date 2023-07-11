import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { MaterialModule } from '../material/material.module';
import { UserModule } from './user/user.module'
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    UserModule,
    RouterModule,
    SharedModule
  ]
})
export class HomeModule { }
