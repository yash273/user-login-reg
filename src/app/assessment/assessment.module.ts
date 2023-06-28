import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssessmentRoutingModule } from './assessment-routing.module';
import { MaterialModule } from '../material/material.module'
import { AddComponent } from './add/add.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AssessmentRoutingModule,
    ReactiveFormsModule
  ]
})
export class AssessmentModule { }
