import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './components/users-list/users-list.component';
import { SharedModule } from 'src/shared/shared.module';
import { MaterialModule } from 'src/app/material/material.module';
import { UsersAddEditComponent } from './components/users-add-edit/users-add-edit.component';
import { FormsModule } from '@angular/forms';
import { UsersDeleteComponent } from './dialog/users-delete/users-delete.component';


@NgModule({
  declarations: [
    UsersListComponent,
    UsersAddEditComponent,
    UsersDeleteComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    MaterialModule,
    FormsModule
  ]
})
export class UsersModule { }
