import { Injectable } from '@angular/core';
import { countryData } from '../const/country'

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  country: any;
  getCountries(): string[] {
    return Object.keys(countryData);
  }

  getCitiesByCountry(country: string): string[] {
    return countryData[country];
  }
}
