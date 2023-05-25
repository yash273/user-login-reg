import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { JSONplaceholderserviceService } from '../jsonplaceholderservice.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/alerts/alert.service';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(
    private JSONplaceholder: JSONplaceholderserviceService,
    private alertsService: AlertService) { }

  displayedColumns: string[] = ['id', 'uId', 'title', 'body', 'Action'];

  ngOnInit(): void {

    this.JSONplaceholder.getData()
      .subscribe(data => {
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.paginator = this.paginator;
      })
  }

  view(id: number) {
    this.JSONplaceholder.getDataId(id)
      .subscribe(data => {
        this.JSONplaceholder.openView(data)
      }
      )
  }

  delete(id: number) {
    this.JSONplaceholder.openDelete(id)
      .afterClosed().subscribe((res: boolean) => {
        if (res) {
          this.JSONplaceholder.deleteData(id);
          this.alertsService.showAlert('Data Deleted!', 'success')
        }
      })
  }

  truncateBody(name: any): any {
    const maxLength = 50;
    if (name.length > maxLength) {
      return name.slice(0, maxLength) + '...';
    }
    return name;
  }

  truncateTitle(name: any): any {
    const maxLength = 30;
    if (name.length > maxLength) {
      return name.slice(0, maxLength) + '...';
    }
    return name;
  }

}
