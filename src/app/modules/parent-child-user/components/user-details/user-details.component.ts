import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Users } from 'src/app/modules/users/model/users';
import { UsersService } from 'src/app/modules/users/service/users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  userDetails !: Users
  @Input() userId!: number;
  @Output() userInfo: EventEmitter<Users> = new EventEmitter<Users>();
  displayedColumns: string[] = ['firstName', 'email', 'phone', 'country', 'action'];
  dataSource: Users[] = [];

  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.getUserData(this.userId);
  }

  selectedUserId(userDetails: Users) {
    this.userInfo.emit(userDetails)
  }

  getUserData(id: number | undefined) {
    this.usersService.getUser(id).subscribe((res: Users) => {
      this.userDetails = res;
      this.dataSource = [res];
    })
  }

}
