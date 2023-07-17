import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/alerts/alert.service';
import { UsersDeleteComponent } from 'src/app/modules/users/dialog/users-delete/users-delete.component';
import { UsersService } from 'src/app/modules/users/service/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {


  displayedColumns: string[] = ['id', 'username'];
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
    private usersService: UsersService,
    public dialog: MatDialog,
    private alertService: AlertService
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
    let x = event ? (event.target as HTMLInputElement).value : '';
    if (x.length > 2 || x == '') {
      this.filterValue = x;
      this.usersService.getUserListFilter(this.sortItem, this.sortDirection, this.currentPage, this.itemsPerPage, this.filterValue).subscribe(
        (res) => {
          this.paginator.firstPage();
          this.dataSource.data = res;
          this.totalItems = res.length;
        }
      )
    }
  }

  clearSearchInput() {
    this.searchInput.nativeElement.value = '';
    this.applyFilter(null);
    this.getUserData();
  }

  // delete(id: number) {
  //   const dialogRef = this.dialog.open(UsersDeleteComponent, {
  //     width: '400px',
  //     disableClose: true,
  //   });
  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       this.usersService.deleteUser(id).subscribe(
  //         (res) => {
  //           if (res) {
  //             this.alertService.showAlert('User Deleted Successfully !', 'success');
  //             this.getUserData();
  //           } else {
  //             this.alertService.showAlert('Something Went Wrong !', 'error')
  //           }
  //         });
  //     }
  //   });
  // }


}
