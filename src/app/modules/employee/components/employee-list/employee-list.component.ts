import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/alerts/alert.service';
import { countries, states, cities } from 'src/app/const/country-state-city';
import { UserService } from 'src/app/modules/user/service/user.service';
import { Country, State, City } from 'src/app/interfaces/country-state-city';
import { userRoles } from 'src/app/interfaces/user';
import { User } from 'src/app/modules/user/model/user.model';
import { userRole } from 'src/shared/constants/user-role';
import { EmployeeService } from '../../service/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EmployeeListComponent implements OnInit {

  userList: User[];
  countries: Country[] = countries;
  states: State[] = states;
  cities: City[] = cities;
  userRoles: userRoles[] = userRole;

  pageSizeOption = [2, 4, 6, 10];
  itemsPerPage = this.pageSizeOption[0];
  currentPage = 1;

  pageSize: number = 2;
  totalItems: number = 7;

  startIndex = 0;
  endIndex = 2;
  // endIndex = this.itemsPerPage;

  displayedColumns: string[] = ['srNo', 'name', 'mob', 'type', 'email', 'country', 'state', 'city', 'Action'];
  dataSource!: MatTableDataSource<User>;
  private paginator!: MatPaginator;
  private sort: any;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    // this.setDataSource();
  }

  @ViewChild(MatSort) set content(content: ElementRef) {
    this.sort = content;
    // if (this.sort) {
    //   this.dataSource.sort = this.sort;
    //   this.dataSource.sortData = (data, sort) => this.customSort(data, sort);
    // }
  }

  // setDataSource() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  //   this.dataSource.sortData = (data, sort) => this.customSort(data, sort);
  // }

  @ViewChild('search') searchInput!: ElementRef;

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private employeeService: EmployeeService
  ) {
    this.userList = [];
  }

  ngOnInit(): void {
    const oldRecords = localStorage.getItem('userData');
    this.totalItems = this.getTotalDataCount();
    console.log(this.totalItems)
    if (oldRecords !== null) {
      this.paginationData();
    }
  }

  paginationData() {

    this.userList = this.employeeService.getPaginatedData(this.startIndex, this.endIndex);
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

  pageChangeEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.startIndex = (this.currentPage - 1) * this.pageSize;
    this.endIndex = this.startIndex + this.pageSize
    this.paginationData();
  }

  getTotalDataCount(): number {
    const oldRecords = localStorage.getItem('userData');
    if (oldRecords !== null) {
      this.dataList = JSON.parse(oldRecords);
      return this.dataList.length;
    }
    return 0;
  }

  dataList!: User[]
  sortData(sort: Sort) {
    console.log(sort)
    console.log(sort.active, "active");
    console.log(sort.direction, "dir");
    this.customSort(this.dataList, sort)
  }


  customSort(data: User[], sort: Sort): User[] {
    // debugger
    console.log(data)
    const active = sort.active;
    const direction = sort.direction;

    if (!sort.active || sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let comparison = 0;

      switch (active) {
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
      if (direction === 'desc') {
        comparison = -comparison;
      }

      return comparison;
    });
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
