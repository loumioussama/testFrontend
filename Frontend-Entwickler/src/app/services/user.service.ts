import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public apiURL = 'https://613b658e110e000017a455da.mockapi.io/users';
  constructor(private http: HttpClient) {}
  getUsers(): Observable<any> {
    return this.http.get(this.apiURL);
  }
  delete(id: Number): Observable<any> {
    return this.http.delete(`${this.apiURL}/${id}`);
  }

  update(user: any): Observable<any> {
    return this.http.put(`${this.apiURL}/${user.id}`, user);
  }
  createUser(user: any): Observable<any> {
    return this.http.post(`${this.apiURL}`, user);
  }
}
