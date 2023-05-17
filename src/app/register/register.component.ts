import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UserService } from '../home/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userregister',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  nameRegx = /[a-zA-Z]+$/
  emailRegx = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/
  passRegx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  mobRegx = /^(\+\d{1,3}[- ]?)?\d{10}$/

  userForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.pattern(this.nameRegx)]],
    email: ['', [Validators.required, Validators.email]],
    type: [''],
    pass: ['', [Validators.required, Validators.pattern(this.passRegx)]],
    mob: ['', [Validators.pattern(this.mobRegx)]]
  })

  hide = true;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void { }

  onSubmit() {
    this.userService.saveUser(this.userForm.value);
    this.router.navigate(['/login']);
  }

  get userform() {
    return this.userForm.controls;
  }
}
