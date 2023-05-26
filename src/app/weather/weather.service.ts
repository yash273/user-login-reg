import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  // location: string | undefined;
  // weatherData: any;
  // apiKey = '60fd1100666f49b2a8284450232605';

  // constructor(private http: HttpClient) { }

  // searchWeather() {
  //   // const apiKey = '60fd1100666f49b2a8284450232605';
  //   const apiUrl = `https://api.weatherapi.com/v1/forecast.json?q=${this.location}&days=14&key=${this.apiKey}`

  //   this.http.get(apiUrl).subscribe((data: any) => {
  //     this.weatherData = {
  //       name: data.name
  //     }
  //   })
  // }
}
