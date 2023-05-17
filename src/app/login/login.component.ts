import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../home/user/user.service';


@Component({
  selector: 'app-userlogin',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.scss']
})
export class LoginComponent implements OnInit {

  emailRegx = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/
  passRegx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  userForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    pass: ['', [Validators.required, Validators.pattern(this.passRegx)]],
  })

  hide = true;

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void { }

  onLogin() {
    this.userService.logUser(this.userForm.value.email, this.userForm.value.pass)
  }

  get userform() {
    return this.userForm.controls;
  }

}

