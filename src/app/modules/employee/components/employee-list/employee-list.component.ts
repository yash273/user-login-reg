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
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeDeleteComponent } from '../../dialog/employee-delete/employee-delete.component';
import { AlertService } from 'src/app/alerts/alert.service';

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

  displayedColumns: string[] = ['select', 'srNo', 'name', 'mob', 'type', 'email', 'country', 'state', 'city', 'Action'];
  dataSource!: MatTableDataSource<User>;
  selection = new SelectionModel<User>(true, []);

  selectedRow !: User['name']

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('search') searchInput!: ElementRef;

  constructor(
    private employeeService: EmployeeService,
    private dialog: MatDialog,
    private alertService: AlertService
  ) {
    this.userList = [];
  }

  isAllSelected() {

    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach((row: User) => this.selection.select(row));
  }

  getSelectedNames(): string {
    return this.selection.selected.map(row => row.name).join(', ');
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
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.startIndex = (this.currentPage - 1) * this.pageSize;
    this.endIndex = this.startIndex + this.pageSize;

    if (this.filterValue !== '') {

      if (this.startIndex >= this.totalItems) {
        this.startIndex = 0;
        this.endIndex = this.itemsPerPage;
      }

      this.nextFilteredData = this.getFilteredData(this.startIndex, this.endIndex, this.paginationSort, this.allFilteredData);
      this.dataSource.data = this.nextFilteredData;
    } else {
      this.paginationData();
    }
    this.selection.clear();
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

    let data = this.dataList.slice();
    if (this.filterValue !== '') {
      data = this.allFilteredData.slice();
    }

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
    this.filterValue = event ? (event.target as HTMLInputElement).value : '';

    if (this.filterValue !== '' && this.filterValue.length > 2) {
      //if there is some filterValue
      this.filteredData = this.dataList.filter((item: User) => {
        return (
          item.name?.toLowerCase().includes(this.filterValue.toLowerCase()) ||
          item.mob?.toString().toLowerCase().includes(this.filterValue.toLowerCase()) ||
          item.email?.toLowerCase().includes(this.filterValue.toLowerCase())
        );
      });

      this.allFilteredData = this.filteredData;
      this.totalItems = this.allFilteredData.length;

      if (this.startIndex >= this.totalItems) {
        this.startIndex = 0;
        this.endIndex = this.itemsPerPage;
      }
      this.filteredData = this.getFilteredData(this.startIndex, this.endIndex, this.paginationSort, this.filteredData);
      this.paginator.firstPage();
      this.dataSource.data = this.filteredData;
    }
    else {
      this.totalItems = this.getTotalDataCount();
    }
  }

  clearSearchInput() {
    this.searchInput.nativeElement.value = '';
    this.applyFilter(null);
    this.paginationData();
  }

  getFilteredData(startIndex: number, endIndex: number, sort: Sort, data: User[]): User[] {
    return this.employeeService.sortingFunction(startIndex, endIndex, sort, data)
  }

  deleteAll() {
    if (this.selection.selected.length > 0) {
      const dialogRef = this.dialog.open(EmployeeDeleteComponent, {
        width: '400px',
        disableClose: true,
        data: this.selection.selected
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          const selectedRows = this.selection.selected;

          const oldRecords = localStorage.getItem('userData');
          if (oldRecords !== null) {
            const userList = JSON.parse(oldRecords);

            selectedRows.forEach(row => {
              const idToDelete = row.id;
              userList.splice(userList.findIndex((a: any) => a.id == idToDelete), 1);
              localStorage.setItem('userData', JSON.stringify(userList))
            });
          }
          this.alertService.showAlert('Data deleted Successfully!', 'success')
          this.totalItems = this.getTotalDataCount();
          this.paginationData();
          this.selection.clear();
        }
      });
    } else {
      this.alertService.showAlert('You have not selected any row to perform action! Please select any', 'default')
    }
  }


}
