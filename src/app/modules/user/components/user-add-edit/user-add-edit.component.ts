import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../model/user.model';
import { userRole } from 'src/shared/constants/user-role';
import { Country, State, City } from 'src/app/interfaces/country-state-city';
import { DataService } from 'src/shared/services/data.service';
import { AlertService } from 'src/app/alerts/alert.service';
import { NgForm } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.scss']
})
export class UserAddEditComponent implements OnInit {

  // @ViewChild('userForm') userForm!: NgForm;
  user = new User();
  userRole = userRole;
  selectedCountryId!: string;
  countries!: Country[];
  states!: State[];
  cities!: City[];
  selectedCountry = this.user.country;
  selectedState: any;
  userId: number | undefined;
  prevdata: any;
  hidePass = true;
  hideConfirm = true;

  constructor(
    private dataService: DataService,
    private alertService: AlertService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.countries = this.dataService.getCountries();
    this.userId = Number(this.route.snapshot.params['id']);

    if (this.userId) {
      this.populateForm(this.userId);
    }
  }

  onCountryChange(type: string | null) {
    this.selectedCountry = this.user.country;
    if (this.selectedCountry) {
      this.selectedState = null;
      this.states = this.dataService.getStates(this.selectedCountry);
    } else {
      this.states = [];
    }
    if (!type) {
      this.user.state = '';
      this.user.city = '';
    }

  }

  onStateChange(type: string | null) {
    this.selectedState = this.user.state;
    if (this.selectedState) {
      this.cities = this.dataService.getCities(this.selectedState);
    } else {
      this.cities = [];
    }
    if (!type) {
      this.user.city = '';
    }
  }

  submit(userForm: NgForm) {

    if (userForm.valid) {
      const { confirmPass, ...formData } = this.user;
      this.userService.saveUser(formData);
    } else {
      this.alertService.showAlert('Please fill all details correctly!', 'error')
    }

  }

  populateForm(uId: number) {
    this.prevdata = this.userService.getData(uId);
    this.user = this.prevdata;
    this.onCountryChange('update');
    this.onStateChange('update');
    console.log(this.user)
  }

  update(userForm: NgForm) {
    if (userForm.valid) {
      if (this.userId) {
        this.userService.update(userForm.value, this.userId);
      } else {
        this.alertService.showAlert('Please fill all details correctly!', 'error')
      }
    }
  }
  check(event: Event) {
    console.log(event)
  }

}
