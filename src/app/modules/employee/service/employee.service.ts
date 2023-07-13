import { Injectable } from '@angular/core';
import { User } from '../../user/model/user.model';
import { Sort } from '@angular/material/sort';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  userList: User[] = [];

  constructor() { }

  getPaginatedData(startIndex: number, endIndex: number, sort: Sort) {
    const oldRecords = localStorage.getItem('userData');
    if (oldRecords !== null) {

      this.userList = JSON.parse(oldRecords);
      const data = this.userList.slice();
      return this.sortingFunction(startIndex, endIndex, sort, data);
    }
    return this.userList.slice(startIndex, endIndex)
  }

  sortingFunction(startIndex: number, endIndex: number, sort: Sort, data: User[]) {
    debugger
    if (sort.direction === '' || !sort.active) {
      data.sort((a: User, b: User) => {
        if (a.id && b.id) {
          return a.id - b.id;
        }
        return 0;
      });
      return data.slice(startIndex, endIndex);
    }

    const x = data.sort((a: User, b: User) => {
      sort.direction === 'asc';
      let comparison = 0;

      switch (sort.active) {
        case 'name':
          if (a.name && b.name)
            comparison = a.name.localeCompare(b.name);
          break;
        case 'mob':
          if (a.mob && b.mob)
            comparison = a.mob - b.mob;
          break;
        case 'email':
          if (a.email && b.email)
            comparison = a.email.localeCompare(b.email);
          break;
      }
      if (sort.direction === 'desc') {
        comparison = -comparison;
      }
      return comparison;
    });

    return x.slice(startIndex, endIndex)
  }

}


