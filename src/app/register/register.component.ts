import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UserService } from '../home/user/user.service';
import { Router } from '@angular/router';
import { emailRegx, mobRegx, nameRegx, passRegx } from '../regex-rules/regex';
import { AlertService } from '../alerts/alert.service';
import { DataService } from '../../shared/services/data.service';
import { Country, State, City } from '../interfaces/country-state-city';

@Component({
  selector: 'app-userregister',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  hide = true;
  userForm: any
  addGroup!: FormGroup;

  selectedCountryId!: string;
  countries!: Country[];
  states!: State[];
  cities!: City[];

  isSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private alertService: AlertService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.isSubmitted = false
    this.createUserFormGroup();
    this.countries = this.dataService.getCountries();
  }



  get userform() {
    return this.userForm.controls;
  }

  get addresses(): FormArray {
    return this.userForm.get('addresses') as FormArray;
  }

  createUserFormGroup(): FormGroup {
    return this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(nameRegx)]],
      email: ['', [Validators.required, Validators.pattern(emailRegx)]],
      type: ['', [Validators.required]],
      pass: ['', [Validators.required, Validators.pattern(passRegx)]],
      mob: ['', [Validators.pattern(mobRegx)]],
      addresses: this.formBuilder.array([this.createAddressGroup()]),
      country: [this.selectedCountryId, [Validators.required]],
      state: [null, [Validators.required]],
      city: [null, [Validators.required]]
    }
    )
  }

  requiredIfDirty(control: AbstractControl) {
    if (control.dirty) {
      return Validators.required(control);
    }

    return null;
  }

  createAddressGroup(): FormGroup {
    return this.formBuilder.group({
      add: ['', Validators.required],
    }
    );
  }

  addAddress() {
    this.addresses.push(this.createAddressGroup());
  }

  removeAddress(index: number) {
    this.addresses.removeAt(index);
  }


  onCountryIdChange() {
    const selectedCountryControl = this.userForm.get('country')
    const countryId = selectedCountryControl.value;
    if (countryId) {
      this.states = this.dataService.getStates(countryId);
    } else {
      this.states = [];
    }

    this.userForm.get('state')?.setValue(null);
    this.userForm.get('city')?.setValue(null);
  }

  onStateChange() {
    const stateId = this.userForm.get('state').value;
    this.cities = this.dataService.getCities(stateId);
    this.userForm.get('city')?.setValue(null);
  }

  onSubmit() {
    this.isSubmitted = true;
    // this.setValidators();
    // this.userForm
    console.log(this.userForm)
    if (this.userForm.valid) {
      this.userService.saveUser(this.userForm.value);
      this.router.navigate(['/login']);
    } else {
      this.alertService.showAlert('Please Fill Correct Data!', "error")
    }
  }
}
