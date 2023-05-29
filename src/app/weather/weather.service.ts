import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  apiKey = '60fd1100666f49b2a8284450232605';

  constructor(private http: HttpClient) { }

  getWeather(location: string) {
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?q=${location}&days=14&key=${this.apiKey}`
    return this.http.get(apiUrl)
  }
}
