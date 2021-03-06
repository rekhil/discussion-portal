import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Config } from '../../shared/config';

@Injectable({
  providedIn: 'root',
})
export class DiscussionService {
  private posts = new BehaviorSubject<any>([]);
  public posts$ = this.posts.asObservable();
  private baseUrl = Config.apiBaseUrl;

  constructor(private http: HttpClient) { }

  searchPosts() {
    this.http.get(this.baseUrl + 'discussions').subscribe((data) => {
      this.posts.next(data);
    });
  }

  getQuestionById(postId: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + `discussions/${postId}`);
  }

  createPost(request: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'discussions', request);
  }

  updatePost(request: any, id: number): Observable<any> {
    return this.http.put(this.baseUrl + 'discussions/' + id, request);
  }

  updateVote(request: any): Observable<any> {
    return this.http.post(
      this.baseUrl + 'discussions/updatePostLikeStatus',
      request
    );
  }
}
