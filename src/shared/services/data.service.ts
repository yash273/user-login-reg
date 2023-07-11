import { Injectable } from '@angular/core';
import { cities, countries, states } from 'src/app/const/country-state-city';
import { City, Country, State } from 'src/app/interfaces/country-state-city';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  countries: Country[] = countries;
  states: State[] = states;
  cities: City[] = cities;

  constructor() { }

  getCountries(): Country[] {
    return this.countries;
  }

  getStates(countryId: string): State[] {
    return this.states.filter((state: State) => state.countryId === countryId);
  }

  getCities(stateId: string): City[] {
    return this.cities.filter((city: City) => city.stateId === stateId);
  }

}
