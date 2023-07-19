import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynamicFormRoutingModule } from './dynamic-form-routing.module';
import { CreateFormComponent } from './components/create-form/create-form.component';
import { ViewFormComponent } from './components/view-form/view-form.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreateFormComponent,
    ViewFormComponent
  ],
  imports: [
    CommonModule,
    DynamicFormRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class DynamicFormModule { }
