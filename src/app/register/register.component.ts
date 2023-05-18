import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
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

  userForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.pattern(nameRegx)]],
    email: ['', [Validators.required, Validators.pattern(emailRegx)]],
    type: ['', [Validators.required]],
    pass: ['', [Validators.required, Validators.pattern(passRegx)]],
    mob: ['', [Validators.pattern(mobRegx)]]
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
