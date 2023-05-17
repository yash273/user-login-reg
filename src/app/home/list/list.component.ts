import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  userList: any;

  displayedColumns: string[] = ['srNo', 'name', 'mobile', 'type', 'email', 'Action'];

  constructor(private userService: UserService) {
    this.userList = []
  }

  ngOnInit(): void {
    const oldRecords = localStorage.getItem('userData');
    if (oldRecords !== null) {
      this.userList = JSON.parse(oldRecords)
    }
  }

  onLogout() {
    this.userService.logoutUser()
  }

}
