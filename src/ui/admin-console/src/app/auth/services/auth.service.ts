import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'https://xenon-anvil-310308.appspot.com/api/';

  constructor(private http: HttpClient) { }

  getUser(username: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'users/' + username);
  }
}
