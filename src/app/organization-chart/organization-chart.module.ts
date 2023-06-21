import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationChartRoutingModule } from './organization-chart-routing.module';
import { ChartComponent } from './chart/chart.component';
import { AboutComponent } from './about/about.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    ChartComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    OrganizationChartRoutingModule,
    MaterialModule
  ]
})
export class OrganizationChartModule { }
