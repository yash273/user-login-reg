import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssessmentRoutingModule } from './assessment-routing.module';
import { MaterialModule } from '../material/material.module'
import { AddComponent } from './add/add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AddComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AssessmentRoutingModule,
    ReactiveFormsModule,
    NgChartsModule
  ]
})
export class AssessmentModule { }
