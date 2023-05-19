import { Injectable } from '@angular/core';
import { userObj } from '../../interfaces/user';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/alerts/alert.service';
import { MatDialog } from '@angular/material/dialog';
import { DetailsComponent } from './details/details.component';
import { DeleteComponent } from './delete/delete.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loggedData: userObj | undefined | null;

  constructor(private router: Router, private alertsService: AlertService, private dialog: MatDialog) { }

  // get logged user data
  public get userValue() {
    const loggedRecords = localStorage.getItem('loggedUserData');
    if (loggedRecords !== null) {
      const newList = JSON.parse(loggedRecords);
      this.loggedData = newList[0]
    }
    return this.loggedData
  }

  // create new user id
  newUserId(): number {
    const timestamp = new Date().getTime();
    const randomNum = Math.floor(Math.random() * 1000000);
    const uniqueId = timestamp * 1000000 + randomNum;
    return uniqueId;
  }

  // save user
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
    this.alertsService.showAlert('Registration Successful!', 'success')

  }

  // login user
  logUser(dataEmail: string, dataPass: string) {
    const oldRecords = localStorage.getItem('userData');
    if (oldRecords !== null) {
      const userList = JSON.parse(oldRecords);
      const currentEmail = userList.findIndex((a: any) => a.email == dataEmail);
      if (currentEmail > -1 && userList[currentEmail].pass === dataPass) {
        this.alertsService.showAlert('Login Successful!', 'success')
        localStorage.removeItem('loggedUserData');
        const userNewArr = [];
        userNewArr.push(userList[currentEmail]);
        localStorage.setItem('loggedUserData', JSON.stringify(userNewArr));
        this.router.navigate(['/home']);
      } else {
        this.alertsService.showAlert('Invalid Email or Password!', 'error')
      }
    } else {
      this.alertsService.showAlert('Invalid Email or Password!', 'error')
    }
  }

  // logout user
  logoutUser() {
    const logUser = localStorage.getItem('loggedUserData')
    if (logUser !== null) {
      localStorage.removeItem('loggedUserData');
    }
    this.loggedData = null
    this.alertsService.showAlert('Sucessfully Logged out!', 'success')
    this.router.navigate(['/login'])
  }

  // open detail dialog
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

  // open delete confirm dialog
  deleteUser(user: userObj) {
    return this.dialog.open(DeleteComponent, {
      width: '400px',
      disableClose: true,
      data: {
        name: user.name,
      }
    });
  }

  // get entered data
  getdata(id: number) {
    const oldRecords = localStorage.getItem('userData');
    if (oldRecords !== null) {
      const userList = JSON.parse(oldRecords);
      const idIndex = userList.findIndex((a: any) => a.id == id);
      return userList[idIndex]
    }
  }

  // update data
  update(data: userObj, id: any) {
    const oldRecords = localStorage.getItem('userData');
    if (oldRecords !== null) {
      const userList = JSON.parse(oldRecords);
      userList.splice(userList.findIndex((a: any) => a.id == id), 1);
      data.id = id;
      const loggedRecords = localStorage.getItem('loggedUserData');
      if (loggedRecords !== null) {
        const newList = JSON.parse(loggedRecords);
        const x = newList.findIndex((b: any) => b.id == id);
        if (x !== -1) {
          const y = newList[x].id
          if (y !== data.id) {
            userList.push(data);
            localStorage.setItem('userData', JSON.stringify(userList));
          } else {
            userList.push(data);
            localStorage.setItem('userData', JSON.stringify(userList));
            newList.splice(newList.findIndex((a: any) => a.id == id), 1);
            newList.push(data);
            localStorage.setItem('loggedUserData', JSON.stringify(newList));
          }
        } else {
          userList.push(data);
          localStorage.setItem('userData', JSON.stringify(userList));
        }
      }
    }
    this.router.navigateByUrl('/home/list');
  }
}
