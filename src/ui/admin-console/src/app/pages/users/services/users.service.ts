import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl = 'https://xenon-anvil-310308.appspot.com/api/users/';

  constructor(private http: HttpClient) { }

  getUser(username: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + username);
  }

  searchUser(username: string): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'search', { searchText: username });
  }

  createUser(user: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, user);
  }

  editUser(user: any): Observable<any> {
    return this.http.put<any>(this.baseUrl, user);
  }

  deleteUser(username: string): Observable<any> {
    return this.http.delete<any>(this.baseUrl + username);
  }

}