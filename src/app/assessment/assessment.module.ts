import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AssessmentRoutingModule } from './assessment-routing.module';
import { MaterialModule } from '../material/material.module'
import { AddComponent } from './add/add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { IconSwitchComponent } from './icon-switch/icon-switch.component';
import { ShowChartComponent } from './show-chart/show-chart.component';
import { EditComponent } from './edit/edit.component';
@NgModule({
  declarations: [
    AddComponent,
    ListComponent,
    ViewComponent,
    IconSwitchComponent,
    ShowChartComponent,
    EditComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AssessmentRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AssessmentModule { }
