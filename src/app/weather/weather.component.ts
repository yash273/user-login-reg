import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { WeatherService } from './weather.service';
import { AlertService } from '../alerts/alert.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  data: any;
  location: any;
  dataSource!: MatTableDataSource<any>;
  forecastData: any;

  constructor(
    private weatherService: WeatherService,
    private alertService: AlertService
  ) { }
  displayedColumns: string[] = ['date', 'temparature', 'condition']

  ngOnInit(): void {
  }

  searchWeather() {
    this.weatherService.getWeather(this.location).subscribe(
      (res) => {
        debugger
        console.log(res), this.data = res,
          this.forecastData = this.data.forecast.forecastday,
          console.log(this.forecastData)
        this.dataSource = new MatTableDataSource<any>(this.forecastData);
      },
      (err) => {
        this.alertService.showAlert('Please Enter Valid Data', 'error')
      }
    )
  }

}
