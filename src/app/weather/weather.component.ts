import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  location = 'london';
  weatherData: any;
  // apiKey = '60fd1100666f49b2a8284450232605';

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
  }

  searchWeather() {
    debugger
    const apiKey = '60fd1100666f49b2a8284450232605';
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?q=${this.location}&days=14&key=${apiKey}`

    this.http.get(apiUrl).subscribe((data: any) => {
      debugger
      this.weatherData = {
        name: data.name
      }
    })
  }

}
