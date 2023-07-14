import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Users } from '../model/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient
  ) { }

  getUser(id: number): Observable<Users> {
    return this.http.get<Users>
      (environment.baseURL +
        `users/${id}`
      );
  }

  getUserListFilter(column: string, direction: string, page: number, limit: number, filterValue: string): Observable<Users[]> {
    return this.http.get<Users[]>
      (environment.baseURL +
        `users?username_like=${filterValue}&_sort=${column}&_order=${direction}&_page=${page}&_limit=${limit}`
      )
  }

}
