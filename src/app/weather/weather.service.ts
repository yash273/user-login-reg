import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiKey = '60fd1100666f49b2a8284450232605';
  private locationSubject: BehaviorSubject<string> = new BehaviorSubject<string>('Ahmedabad');
  constructor(private http: HttpClient) { }

  newLocation(location: string): void {
    this.locationSubject.next(location);
  }
  getWeather(): Observable<any> {
    return this.locationSubject.pipe(
      switchMap((location: string) => {
        const apiUrl = `https://api.weatherapi.com/v1/forecast.json?q=${location}&days=14&key=${this.apiKey}`
        return this.http.get(apiUrl)
      })
    );

  }
}


