import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherRoutingModule } from './weather-routing.module';
import { WeatherComponent } from './weather.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { ChartComponent } from './chart/chart.component';
import { GoogleChartsModule } from 'angular-google-charts';
@NgModule({
  declarations: [
    WeatherComponent,
    ChartComponent
  ],
  imports: [
    CommonModule,
    WeatherRoutingModule,
    MaterialModule,
    FormsModule,
    GoogleChartsModule.forRoot(),
  ]
})
export class WeatherModule { }
