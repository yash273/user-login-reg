import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../../service/users.service';
import { Users } from '../../model/users';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {



  displayedColumns: string[] = ['id', 'username', 'firstName', 'phone', 'email', 'country', 'Action'];
  dataSource = new MatTableDataSource();

  pageSizeOption = [5, 10, 20];
  itemsPerPage = this.pageSizeOption[0];
  currentPage = 1;

  pageSize: number = this.itemsPerPage
  totalItems: number = 20;

  sortDirection: string = 'asc';
  sortItem: string = 'id';

  filterValue: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('search') searchInput!: ElementRef;

  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.usersService.getUserListFilter(this.sortItem, this.sortDirection, this.currentPage, this.itemsPerPage, this.filterValue).subscribe(
      (res) => {
        this.dataSource.data = res;
        this.totalItems = 20;
      }
    );
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.itemsPerPage = event.pageSize;
    this.getUserData();
  }

  onSortChange(sort: Sort) {
    this.sortDirection = sort.direction;
    this.sortItem = sort.active;
    this.getUserData();
  }

  applyFilter(event: Event | null) {
    this.filterValue = event ? (event.target as HTMLInputElement).value : '';
    this.usersService.getUserListFilter(this.sortItem, this.sortDirection, this.currentPage, this.itemsPerPage, this.filterValue).subscribe(
      (res) => {
        this.paginator.firstPage();
        this.dataSource.data = res;
        this.totalItems = res.length;
      }
    );
  }

  clearSearchInput() {
    this.searchInput.nativeElement.value = '';
    this.applyFilter(null);
    this.getUserData();
  }
}
