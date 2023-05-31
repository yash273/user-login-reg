import { Component, OnInit, ViewChild } from '@angular/core';
import { WeatherService } from '../weather.service';
import { AlertService } from 'src/app/alerts/alert.service';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  dataW: any;
  forecastData: any;
  public chart: any;


  constructor(
    private weatherService: WeatherService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.weatherData()
  }

  chartType = ChartType.AreaChart;
  chartData: any;
  chartOptions = {
    title: 'Temperature',
    vAxis: {
      title: 'Temperature (°C)',
    },
    hAxis: {
      title: 'Day',
    },
    colors: ['#484CE3', '#004411', '#EE1C25'],
    backgroundColor: 'transparent',
  };

  weatherData() {
    this.weatherService.getWeather().subscribe(
      (res) => {
        this.dataW = res
        this.forecastData = this.dataW.forecast.forecastday,
          this.prepareChartData();
      },
      (err) => {
        this.alertService.showAlert('Please Enter Valid Data', 'error')
      }
    )
  }

  prepareChartData() {
    const newForecastData = this.forecastData.map((item: any) => [item.date, item.day.maxtemp_c, item.day.avgtemp_c, item.day.mintemp_c]);
    this.chartData = newForecastData
  }

}
