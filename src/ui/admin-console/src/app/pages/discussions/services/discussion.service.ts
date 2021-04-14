import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DiscussionService {

  private questions = new BehaviorSubject<any>([]);
  public questions$ = this.questions.asObservable();

  constructor(private http: HttpClient) {
    this.searchQuestions();
  }

  searchQuestions() {
    this.http.get('assets/data/questions.json').subscribe(data => {
      this.questions.next(data);
    })
  }

  getQuestionById(questionId: any): Observable<any> {
    return this.questions$.pipe(map<any[], any>(questions => {
      return questions.filter(item => item.id == questionId)
    }))
  }

  postAnswer(request: any): void {
    const questions = [...this.questions.value]
    questions.forEach(item => {
      if (item.id == request.id) {
        item.replyPosts.push(request.answer)
      }
    });
    this.questions.next(questions);
  }

  updateVote(request: any): void {
    const questions = [...this.questions.value]
    questions.forEach(item => {
      if (item.id == request.id) {
        item.replyPosts.forEach(e => {
          if (e.id == request.threadId) {
            e.voteCount += request.vote;
          }
        })
      }
    });
    this.questions.next(questions);
  }
}
