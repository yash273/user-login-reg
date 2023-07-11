import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AlertService } from 'src/app/alerts/alert.service';
import { UserService } from '../../service/user.service';
import { City, Country, State } from 'src/app/interfaces/country-state-city';
import { cities, countries, states } from 'src/app/const/country-state-city';
import { userRole } from 'src/shared/constants/user-role';
import { userRoles } from 'src/app/interfaces/user'
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../model/user.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  // Need to remove view encapsulation so that the custom tooltip style defined in `user-list.component.scss` will not be scoped to this component's view.
  encapsulation: ViewEncapsulation.None,
})
export class UserListComponent implements OnInit, AfterViewInit {

  userList: User[];
  countries: Country[] = countries;
  states: State[] = states;
  cities: City[] = cities;
  userRoles: userRoles[] = userRole;

  displayedColumns: string[] = ['srNo', 'name', 'mobile', 'type', 'email', 'country', 'state', 'city', 'Action'];
  dataSource!: MatTableDataSource<User>;

  @ViewChild(MatSort) sort: MatSort | null = null;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild('search') searchInput!: ElementRef;

  constructor(
    private userService: UserService,
    private alertService: AlertService,
  ) {
    this.userList = [];
  }

  ngOnInit(): void {
    const oldRecords = localStorage.getItem('userData');
    if (oldRecords !== null) {
      this.userList = JSON.parse(oldRecords);

      this.userList.sort((a, b) => {
        if (a.id && b.id) {
          return a.id - b.id;
        }
        return 0;
      });

      this.dataSource = new MatTableDataSource<User>(this.userList);

      this.dataSource.filterPredicate = (data: User, filter: any): boolean => {
        if (data.name && data.mob && data.email) {
          return data.name.toLowerCase().includes(filter) ||
            data.mob.toString().toLowerCase().includes(filter) ||
            data.email.toLowerCase().includes(filter)
        }
        return false
      };
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  delete(id: number) {
    const thisId = this.userList.findIndex((m: User) => m.id == id)
    this.userService.deleteUser(this.userList[thisId])
      .afterClosed().subscribe((res: boolean) => {
        if (res) {
          const oldRecords = localStorage.getItem('userData');
          const loggedRecords = localStorage.getItem('loggedUserData')
          if (oldRecords !== null && loggedRecords !== null) {
            const userList = JSON.parse(oldRecords);
            const loggedUserList = JSON.parse(loggedRecords);
            const y = loggedUserList.findIndex((a: User) => a.id == id);
            if (y !== -1) {
              this.alertService.showAlert('Cannot Delete Current Logged User', 'error')
            } else {
              userList.splice(userList.findIndex((a: User) => a.id == id), 1);
              localStorage.setItem('userData', JSON.stringify(userList));

              this.userList = this.userList.filter(user => user.id !== id); // updating this.userList no deleted id in list
              this.dataSource.data = this.userList;                         // setting this.userList as data od dataSource
              this.dataSource.paginator = this.paginator;                   // setting paginator for this too

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

  applyFilter(event: Event | null) {

    const filterValue = event ? (event.target as HTMLInputElement).value : '';

    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  clearSearchInput() {
    this.searchInput.nativeElement.value = '';
    this.applyFilter(null);
  }

}
