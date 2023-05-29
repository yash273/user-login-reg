import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherRoutingModule } from './weather-routing.module';
import { WeatherComponent } from './weather.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
// import { EchartComponent } from './echart/echart.component';
// import { NgxEchartsModule } from 'ngx-echarts';



@NgModule({
  declarations: [
    WeatherComponent,
    // EchartComponent,
  ],
  imports: [
    CommonModule,
    WeatherRoutingModule,
    MaterialModule,
    FormsModule,
    // NgxEchartsModule
  ]
})
export class WeatherModule { }
