import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../home/user/user.service';
import { emailRegx, passRegx } from '../regex-rules/regex';


@Component({
  selector: 'app-userlogin',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  userForm!: FormGroup

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(emailRegx)]],
      pass: ['', [Validators.required]],
    })
  }

  onLogin() {
    this.userService.logUser(this.userForm.value.email, this.userForm.value.pass)
  }

  get userform() {
    return this.userForm.controls;
  }

}

