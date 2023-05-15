import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styles: [
  ]
})
export class UserloginComponent implements OnInit {

  constructor(private fb: FormBuilder,private us: UserService) { }

    ngOnInit(): void {
  }
  nameRegx =/[a-zA-Z]+$/
  emailRegx = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/
  passRegx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  mobRegx = /^(\+\d{1,3}[- ]?)?\d{10}$/

  userForm = this.fb.group({
    email : ['',[Validators.required,Validators.email]],
    pass : ['',[Validators.required,Validators.pattern(this.passRegx)]],
  })
   hide = true;


  onLogin() {
  this.us.logUser(this.userForm.value.email,this.userForm.value.pass)  
}

get uf() { 
  return this.userForm.controls; 
}

}

