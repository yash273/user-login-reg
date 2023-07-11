import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { userObj } from 'src/app/interfaces/user';
import { AlertService } from 'src/app/alerts/alert.service';
import { DataService } from '../../../shared/services/data.service';
import { countries, states, cities } from 'src/app/const/country-state-city';
import { Country, State, City } from 'src/app/interfaces/country-state-city';

@Component({
  selector: 'app-userlist',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  userList: any;
  user?: userObj | null;
  currentUser: userObj | null | undefined;
  countries: Country[] = countries;
  states: State[] = states;
  cities: City[] = cities;

  displayedColumns: string[] = ['srNo', 'name', 'mobile', 'type', 'email', 'addresses', 'country', 'state', 'city', 'Action'];

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private dataService: DataService) {
    this.userList = [];
    this.currentUser = this.userService.userValue;
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

  onViewAddress(add: any, addIndex: number) {
    this.userService.openAddressDetail(add, addIndex)
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
