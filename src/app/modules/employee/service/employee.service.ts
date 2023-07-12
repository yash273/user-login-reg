import { Injectable } from '@angular/core';
import { User } from '../../user/model/user.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  userList!: User[];

  constructor() { }

  getPaginatedData(startIndex: number, endIndex: number) {
    const oldRecords = localStorage.getItem('userData');
    if (oldRecords !== null) {

      this.userList = JSON.parse(oldRecords);
      this.userList.sort((a, b) => {
        if (a.id && b.id) {
          return a.id - b.id;
        }
        return 0;
      });
    }
    return this.userList.slice(startIndex, endIndex)
  }

  getPaginatedDataObservable(startIndex: number, endIndex: number): Observable<User[]> {
    const oldRecords = localStorage.getItem('userData');
    if (oldRecords !== null) {
      const userList = JSON.parse(oldRecords);
      const sortedList = userList.sort((a: any, b: any) => {
        if (a.id && b.id) {
          return a.id - b.id;
        }
        return 0;
      });

      const slicedData = sortedList.slice(startIndex, endIndex);
      return of(slicedData);
    }

    return of([]);
  }

}
