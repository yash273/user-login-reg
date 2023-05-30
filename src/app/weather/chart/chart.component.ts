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

  location!: string;
  datax: any;
  datac: any;
  forecastData: any;

  public chart: any;


  constructor(
    private weatherService: WeatherService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {

    this.weatherData()

  }

  chartType = ChartType.BarChart;;
  chartData: any;
  chartOptions = {
    title: 'Temperature',
    hAxis: {
      title: 'Day',
    },
    vAxis: {
      title: 'Temperature (°C)',
    },
  };
  // chartWidth = ;
  // chartHeight = ;


  weatherData() {
    this.weatherService.getWeather().subscribe(
      (res) => {
        this.datax = res
        this.forecastData = this.datax.forecast.forecastday,
          console.log(this.forecastData)
        this.prepareChartData();
      },
      (err) => {
        this.alertService.showAlert('Please Enter Valid Data', 'error')
      }
    )
  }


  prepareChartData() {
    const newForecastData = this.forecastData.map((item: any) => [item.date, item.day.avgtemp_c]);
    this.chartData = newForecastData
  }

}
