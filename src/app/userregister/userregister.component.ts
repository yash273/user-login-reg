import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userregister',
  templateUrl: './userregister.component.html',
  styles: [
  ]
})
export class UserregisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private us: UserService, private router: Router) { }

  ngOnInit(): void { }

  nameRegx = /[a-zA-Z]+$/
  emailRegx = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/
  passRegx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  mobRegx = /^(\+\d{1,3}[- ]?)?\d{10}$/

  userForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(this.nameRegx)]],
    email: ['', [Validators.required, Validators.email]],
    type: ['',],
    pass: ['', [Validators.required, Validators.pattern(this.passRegx)]],
    userMob: ['', [Validators.pattern(this.mobRegx)]]
  })

  hide = true;

  onSubmit() {
    this.us.saveUser(this.userForm.value);
    this.router.navigate(['/login']);
  }

  get uf() {
    return this.userForm.controls;
  }
}
