import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { UserAddEditComponent } from './components/user-add-edit/user-add-edit.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { MaterialModule } from 'src/app/material/material.module';
import { PasswordMatchDirective } from './directives/password-match.directive';
import { SharedModule } from 'src/shared/shared.module';
import { UserDeleteComponent } from './dialog/user-delete/user-delete.component';

@NgModule({
  declarations: [
    UserAddEditComponent,
    UserListComponent,
    PasswordMatchDirective,
    UserDeleteComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    FormsModule,
    SharedModule
  ]
})
export class UserModule { }
