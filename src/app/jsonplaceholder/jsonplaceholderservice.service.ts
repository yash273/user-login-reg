import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ViewComponent } from './view/view.component';
import { DeleteComponent } from './delete/delete.component';

@Injectable({
  providedIn: 'root'
})
export class JSONplaceholderserviceService {
  private baseUrl = "https://jsonplaceholder.typicode.com"

  constructor(
    private http: HttpClient,
    private dialog: MatDialog
  ) { }

  // get all data(GET)
  getData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/posts`)
  }

  // get data by id(GET)
  getDataId(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/posts/${id}`);
  }

  // create data(POST)
  createData(post: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/posts`, post);
  }

  // update data(PUT)
  updateData(id: number, post: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/posts/${id}`, post);
  }

  // delete data by id (DELETE)
  deleteData(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/posts/${id}`);
  }

  // open view dialog
  openView(data: any) {
    return this.dialog.open(ViewComponent, {
      width: '400px',
      disableClose: true,
      data: {
        title: data.title,
        id: data.id,
        userId: data.userId,
        body: data.body
      }
    });
  }

  // open confirm delete dialog
  openDelete(data: any) {
    return this.dialog.open(DeleteComponent, {
      width: '400px',
      disableClose: true,
      data: data
    });
  }

}