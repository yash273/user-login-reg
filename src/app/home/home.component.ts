import { Component, Input, OnInit } from '@angular/core';
import { userObj } from '../interfaces/user';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user?: userObj | null;
  userData: any;
  // userList: userObj[];


  constructor(private userService: UserService) {
    this.user = this.userService.userValue;
    // this.userList = [];

  }

  ngOnInit(): void {
  }

  onLogout() {
    this.userService.logoutUser()
  }

  onView(id: any) {
    if (this.user !== null && this.user !== undefined) {
      this.userService.openDetail(this.user)
    }
  }

}
