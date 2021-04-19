import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from 'src/app/shared/config';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseUrl = Config.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getUser(username: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + username);
  }
}