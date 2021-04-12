import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiscussionService {

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<any> {
    return this.http.get('assets/data/questions.json');
  }
}
