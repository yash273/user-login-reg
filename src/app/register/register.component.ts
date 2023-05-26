import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UserService } from '../home/user/user.service';
import { Router } from '@angular/router';
import { emailRegx, mobRegx, nameRegx, passRegx } from '../regex-rules/regex';

@Component({
  selector: 'app-userregister',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  hide = true;
  userForm: any
  addGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(nameRegx)]],
      email: ['', [Validators.required, Validators.pattern(emailRegx)]],
      type: ['', [Validators.required]],
      pass: ['', [Validators.required, Validators.pattern(passRegx)]],
      mob: ['', [Validators.pattern(mobRegx)]],
      addresses: this.formBuilder.array([this.createAddressGroup()])
    });
  }

  onSubmit() {
    this.userService.saveUser(this.userForm.value);
    this.router.navigate(['/login']);
  }

  get userform() {
    return this.userForm.controls;
  }

  get addresses(): FormArray {
    return this.userForm.get('addresses') as FormArray;
  }

  createAddressGroup(): FormGroup {
    return this.formBuilder.group({
      add: ['', Validators.required],
    });
  }

  addAddress() {
    this.addresses.push(this.createAddressGroup());
  }

  removeAddress(index: number) {
    this.addresses.removeAt(index);
  }

}
