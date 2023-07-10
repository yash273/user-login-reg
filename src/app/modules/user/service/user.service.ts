import { Injectable } from '@angular/core';
import { AlertService } from 'src/app/alerts/alert.service';
import { User } from '../model/user.model';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserDeleteComponent } from '../dialog/user-delete/user-delete.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private alertsService: AlertService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  newUserId(): number {
    const timestamp = new Date().getTime();
    const randomNum = Math.floor(Math.random() * 1000000);
    const uniqueId = timestamp * 1000000 + randomNum;
    return uniqueId;
  }


  saveUser(data: User) {
    const oldRecords = localStorage.getItem('userData');
    const latestId = this.newUserId();
    data.id = latestId;

    if (oldRecords !== null) {
      const userList = JSON.parse(oldRecords);
      const oldEmail = userList.findIndex((e: any) => e.email == data.email);

      if (oldEmail === -1) {
        userList.push(data);
        localStorage.setItem('userData', JSON.stringify(userList));
        this.alertsService.showAlert('Registration Successful!', 'success')
      }
      else {
        this.alertsService.showAlert('User already Exists! Please register with different Email Id..', 'error')
      }
    } else {
      const userArr = [data];
      localStorage.setItem('userData', JSON.stringify(userArr));
      this.alertsService.showAlert('Registration Successful!', 'success')
    }
  }

  getdata(id: number) {
    const oldRecords = localStorage.getItem('userData');
    if (oldRecords !== null) {
      const userList = JSON.parse(oldRecords);
      const idIndex = userList.findIndex((a: any) => a.id == id);
      return userList[idIndex]
    }
  }

  update(data: User, id: number) {
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
    this.router.navigateByUrl('/user');
  }


  deleteUser(user: User) {
    return this.dialog.open(UserDeleteComponent, {
      width: '400px',
      disableClose: true,
      data: {
        name: user.name,
      }
    });
  }
}
