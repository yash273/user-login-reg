import { Injectable } from '@angular/core';
import { userObj } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // userObj: userObj = new userObj;
// userObj : userList[]

  constructor() { 

  }
    newUserId(){
    // debugger;
    const oldRecords = localStorage.getItem('userData');
    
    if ( oldRecords !== null) {

      const userist = JSON.parse(oldRecords);
      const lastItem = userist.slice(-1).pop()
      // const lastItem = oldRecords.slice(-1).pop()

      const lastItemId = JSON.parse(lastItem.userId)
      // const lastItemId = JSON.parse(userList.userId)
      // console.log("user id pervious" + lastItemId)
      return lastItemId + 1
    }else {
      return 1;
    }
  }

  saveUser(userDatax : userObj){
    // debugger
    const latestId = this.newUserId();
    userDatax.userId = latestId;
    const oldRecords = localStorage.getItem('userData');
    if ( oldRecords !== null) {
      const userist = JSON.parse(oldRecords);
      // console.log(userist)
      userist.push(userDatax);
  localStorage.setItem('userData', JSON.stringify(userist));
    } else {
      const userArr = [];
      userArr.push(userDatax);
  localStorage.setItem('userData', JSON.stringify(userArr));
    }
  }
  logUser(email : string,pass : string){
    console.log(email)
    const oldRecords = localStorage.getItem('userData');
    // if ( oldRecords !== null) {

    //   const userist = JSON.parse(oldRecords);


    // // console.log(userist.findIndex(email == email));
    // }
  }
}
