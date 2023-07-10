import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/alerts/alert.service';
import { userObj } from 'src/app/interfaces/user';
import { DataService } from 'src/shared/services/data.service';
import { UserService } from '../../service/user.service';
import { City, Country, State } from 'src/app/interfaces/country-state-city';
import { cities, countries, states } from 'src/app/const/country-state-city';
import { userRole } from 'src/shared/constants/user-role';
import { userRoles } from 'src/app/interfaces/user'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  userList: any;
  countries: Country[] = countries;
  states: State[] = states;
  cities: City[] = cities;
  userRoles: userRoles[] = userRole;


  displayedColumns: string[] = ['srNo', 'name', 'mobile', 'type', 'email', 'country', 'state', 'city', 'Action'];

  constructor(
    private userService: UserService,
    private alertService: AlertService,
  ) {
    this.userList = [];
  }

  ngOnInit(): void {
    const oldRecords = localStorage.getItem('userData');
    if (oldRecords !== null) {
      this.userList = JSON.parse(oldRecords)
    }
  }

  delete(id: any) {
    const thisId = this.userList.findIndex((m: any) => m.id == id)
    this.userService.deleteUser(this.userList[thisId])
      .afterClosed().subscribe((res: boolean) => {
        if (res) {
          const oldRecords = localStorage.getItem('userData');
          const loggedRecords = localStorage.getItem('loggedUserData')
          if (oldRecords !== null && loggedRecords !== null) {
            const userList = JSON.parse(oldRecords);
            const loggedUserList = JSON.parse(loggedRecords);
            const y = loggedUserList.findIndex((a: any) => a.id == id);
            if (y !== -1) {
              this.alertService.showAlert('Cannot Delete Current Logged User', 'error')
            } else {
              userList.splice(userList.findIndex((a: any) => a.id == id), 1);
              localStorage.setItem('userData', JSON.stringify(userList));
              this.alertService.showAlert('Record Deleted', 'success')
            }
          }
          const records = localStorage.getItem('userData');
          if (records !== null) {
            this.userList = JSON.parse(records);
          }
        }
      });
  }

  truncateName(name: any): any {
    const maxLength = 20;
    if (name.length > maxLength) {
      return name.slice(0, maxLength) + '...';
    }
    return name;
  }

}
