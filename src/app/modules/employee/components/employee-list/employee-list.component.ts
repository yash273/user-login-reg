import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { countries, states, cities } from 'src/app/const/country-state-city';
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

  pageSize: number = this.itemsPerPage
  totalItems: number = 7;

  startIndex = 0;
  endIndex = this.itemsPerPage;

  dataList!: User[]
  paginationSort: Sort = { active: '', direction: '' }
  filterValue: string = '';

  filteredData: User[] = [];
  nextFilteredData: User[] = [];
  allFilteredData: User[] = [];

  displayedColumns: string[] = ['srNo', 'name', 'mob', 'type', 'email', 'country', 'state', 'city', 'Action'];
  dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('search') searchInput!: ElementRef;

  constructor(
    private employeeService: EmployeeService
  ) {
    this.userList = [];
  }

  ngOnInit(): void {
    const oldRecords = localStorage.getItem('userData');
    this.totalItems = this.getTotalDataCount();
    if (oldRecords !== null) {
      this.paginationData();
    }
  }

  paginationData() {
    this.userList = this.employeeService.getPaginatedData(this.startIndex, this.endIndex, this.paginationSort);
    this.dataSource = new MatTableDataSource<User>(this.userList);
  }

  pageChangeEvent(event: PageEvent) {
    debugger
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.startIndex = (this.currentPage - 1) * this.pageSize;
    this.endIndex = this.startIndex + this.pageSize;

    if (this.filterValue !== '') {
      this.totalItems = this.allFilteredData.length;
      this.nextFilteredData = this.xyz(this.startIndex, this.endIndex, this.paginationSort, this.allFilteredData);
      this.dataSource = new MatTableDataSource<User>(this.nextFilteredData);
      console.log(this.allFilteredData)
    } else {
      this.paginationData();
    }
  }

  getTotalDataCount(): number {
    const oldRecords = localStorage.getItem('userData');
    if (oldRecords !== null) {
      this.dataList = JSON.parse(oldRecords);
      return this.dataList.length;
    }
    return 0;
  }

  customSort(sort: Sort) {
    this.paginationSort = sort;
    const data = this.dataList.slice();

    if (!sort.active || sort.direction === '') {
      data.sort((a: any, b: any) => {
        if (a.id && b.id) {
          return a.id - b.id;
        }
        return 0;
      });
      return this.dataSource.data = data.slice(this.startIndex, this.endIndex);
    }

    const x = data.sort((a: User, b: User) => {
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
    return this.dataSource.data = x.slice(this.startIndex, this.endIndex)
  }


  applyFilter(event: Event | null) {
    debugger
    this.filterValue = event ? (event.target as HTMLInputElement).value : '';
    if (this.filterValue !== '') {
      this.filteredData = this.dataList.filter((item: User) => {
        return (
          item.name?.toLowerCase().includes(this.filterValue.toLowerCase()) ||
          item.mob?.toString().toLowerCase().includes(this.filterValue.toLowerCase()) ||
          item.email?.toLowerCase().includes(this.filterValue.toLowerCase())
        );
      });

      // this.totalItems = this.filteredData.length;
      this.allFilteredData = this.filteredData;
      this.totalItems = this.allFilteredData.length;
      // this.startIndex = 0;
      // this.endIndex = this.itemsPerPage;
      this.filteredData = this.xyz(this.startIndex, this.endIndex, this.paginationSort, this.filteredData);
      this.dataSource = new MatTableDataSource<User>(this.filteredData);

    } else {

      this.totalItems = this.getTotalDataCount()
      this.dataSource = new MatTableDataSource<User>(this.userList);
    }
    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }

  }

  clearSearchInput() {
    this.searchInput.nativeElement.value = '';
    this.applyFilter(null);
    // this.paginationData()
  }


  xyz(startIndex: number, endIndex: number, sort: Sort, data: User[]): User[] {
    return this.employeeService.sortingFunction(startIndex, endIndex, sort, data)
  }
}
