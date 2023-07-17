import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/shared/shared.module';
import { EmployeeDeleteComponent } from './dialog/employee-delete/employee-delete.component'

@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeDeleteComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class EmployeeModule { }
