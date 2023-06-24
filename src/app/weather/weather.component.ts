import { Component, OnInit, ViewChild } from '@angular/core';
import { WeatherService } from './weather.service';
import { AlertService } from '../alerts/alert.service';
import { MatTableDataSource } from '@angular/material/table';
import { CountryService } from './country.service';

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
  selectedCountry!: string;
  selectedCity!: string | null;
  countries: string[];
  cities!: string[];

  constructor(
    private weatherService: WeatherService,
    private alertService: AlertService,
    private countryService: CountryService
  ) {
    this.weatherService.getWeather().subscribe(
      (res) => {
        this.data = res,
        this.forecastData = this.data.forecast.forecastday,
          this.dataSource = new MatTableDataSource<any>(this.forecastData);
      },
      (err) => {
        this.alertService.showAlert('Please Enter Valid Data', 'error')
      }
    );
    this.countries = this.countryService.getCountries();
  }

  displayedColumns: string[] = ['date', 'temparature', 'condition']

  ngOnInit(): void {
  }

  searchWeatherLocation() {
    this.weatherService.newLocation(this.location)
  }

  onCountrySelectionChange() {
    this.selectedCity = null;
    if (this.selectedCountry) {
      this.cities = this.countryService.getCitiesByCountry(this.selectedCountry);
    } else {
      this.cities = [];
    }
  }

}
