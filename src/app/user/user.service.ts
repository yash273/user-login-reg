import { Injectable } from '@angular/core';
import { userObj } from '../interfaces/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private router: Router) { }

  public get userVal() {
    const recs = localStorage.getItem('currUserData');
    if (recs !== null) {
      const newList = JSON.parse(recs);
      return newList
    }
  }

  newUserId() {
    const oldRecords = localStorage.getItem('userData');
    if (oldRecords !== null) {
      const userist = JSON.parse(oldRecords);
      const lastItem = userist.slice(-1).pop()
      const lastItemId = JSON.parse(lastItem.userId)
      return lastItemId + 1
    } else {
      return 1;
    }
  }

  saveUser(userDatax: userObj) {
    const latestId = this.newUserId();
    userDatax.userId = latestId;
    const oldRecords = localStorage.getItem('userData');
    if (oldRecords !== null) {
      const userist = JSON.parse(oldRecords);
      userist.push(userDatax);
      localStorage.setItem('userData', JSON.stringify(userist));
    } else {
      const userArr = [];
      userArr.push(userDatax);
      localStorage.setItem('userData', JSON.stringify(userArr));
    }
  }

  logUser(emailI: string, passI: string) {
    const oldRecords = localStorage.getItem('userData');
    if (oldRecords !== null) {
      const userist = JSON.parse(oldRecords);
      const currEmail = userist.findIndex((a: any) => a.email == emailI);
      if (currEmail > -1 && userist[currEmail].pass === passI) {
        console.log('login succ')
        const newRecs = localStorage.getItem('userData');
        if (newRecs !== null) {
          localStorage.removeItem('currUserData');
          const userArr = [];
          userArr.push(userist[currEmail]);
          localStorage.setItem('currUserData', JSON.stringify(userArr));
          this.router.navigate(['/userlist']);
        }
      } else {
        console.log('invalid email or password')
      }
    } else {
      console.log('Fatal error')
    }
  }

  logoutUser() {
    localStorage.removeItem('currUserData');
    this.router.navigate(['/login']);
  }
}
