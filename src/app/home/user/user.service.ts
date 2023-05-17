import { Injectable } from '@angular/core';
import { userObj } from '../../interfaces/user';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/alerts/alerts.service';
import { MatDialog } from '@angular/material/dialog';
import { DetailsComponent } from './details/details.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loggedData: userObj | undefined | null;

  constructor(private router: Router, private alertsService: AlertsService, private dialog: MatDialog) { }

  public get userValue() {
    const loggedRecords = localStorage.getItem('loggedUserData');
    if (loggedRecords !== null) {
      const newList = JSON.parse(loggedRecords);
      this.loggedData = newList[0]
    }
    return this.loggedData
  }

  newUserId() {
    const oldRecords = localStorage.getItem('userData');
    if (oldRecords !== null) {
      const userList = JSON.parse(oldRecords);
      const lastItem = userList.slice(-1).pop()
      const lastItemId = JSON.parse(lastItem.id)
      return lastItemId + 1
    } else {
      return 1;
    }
  }

  saveUser(data: userObj) {
    const latestId = this.newUserId();
    data.id = latestId;
    const oldRecords = localStorage.getItem('userData');
    if (oldRecords !== null) {
      const userList = JSON.parse(oldRecords);
      userList.push(data);
      localStorage.setItem('userData', JSON.stringify(userList));
    } else {
      const userArr = [];
      userArr.push(data);
      localStorage.setItem('userData', JSON.stringify(userArr));
    }
    this.alertsService.showAlert('Registration Successful!', 'close', 'success')

  }

  logUser(dataEmail: string, dataPass: string) {
    const oldRecords = localStorage.getItem('userData');
    if (oldRecords !== null) {
      const userList = JSON.parse(oldRecords);
      const currentEmail = userList.findIndex((a: any) => a.email == dataEmail);
      if (currentEmail > -1 && userList[currentEmail].pass === dataPass) {
        this.alertsService.showAlert('Login Successful!', 'close', 'success')
        localStorage.removeItem('loggedUserData');
        const userNewArr = [];
        userNewArr.push(userList[currentEmail]);
        localStorage.setItem('loggedUserData', JSON.stringify(userNewArr));
        this.router.navigate(['/home']);
      } else {
        this.alertsService.showAlert('Invalid Email or Password!', 'close', 'error')
      }
    } else {
      this.alertsService.showAlert('Invalid Email or Password!', 'close', 'error')
    }
  }

  logoutUser() {
    const logUser = localStorage.getItem('loggedUserData')
    if (logUser !== null) {
      localStorage.removeItem('loggedUserData');
    }
    this.loggedData = null
    this.router.navigate(['/login'])
  }

  openDetail(currentUser: userObj) {
    return this.dialog.open(DetailsComponent, {
      width: '400px',
      disableClose: true,
      data: {
        name: currentUser.name,
        email: currentUser.email,
        type: currentUser.type,
        mob: currentUser.mob
      }
    });
  }

  delete() {

  }
}
