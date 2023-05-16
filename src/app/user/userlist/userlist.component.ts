import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styles: [
  ]
})
export class UserlistComponent implements OnInit {

  userList: any;

  constructor(private us: UserService) { 
    this.userList = []
  }
  
  ngOnInit(): void {
    const oldRecords = localStorage.getItem('userData');
    if( oldRecords !== null){
      this.userList = JSON.parse(oldRecords)
    }
  }
  
  displayedColumns: string[] = ['srNo','name','mobile', 'type', 'email', 'Action'];

}
