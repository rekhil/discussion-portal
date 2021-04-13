import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DiscussionService {

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<any> {
    return this.http.get('assets/data/questions.json');
  }

  getQuestionById(questionId: any): Observable<any> {
    return this.http.get('assets/data/questions.json')
      .pipe(map<any[], any>(data => data.filter(item => item.id == questionId)))
  }
}
