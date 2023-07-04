import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AssessmentRoutingModule } from './assessment-routing.module';
import { MaterialModule } from '../material/material.module'
import { AddComponent } from './add/add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [
    AddComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AssessmentRoutingModule,
    ReactiveFormsModule,
    NgChartsModule,
    FormsModule
  ]
})
export class AssessmentModule { }
