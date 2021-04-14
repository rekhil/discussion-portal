import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DiscussionService {

  private posts = new BehaviorSubject<any>([]);
  public posts$ = this.posts.asObservable();
  private baseUrl = 'https://xenon-anvil-310308.appspot.com/api/';

  constructor(private http: HttpClient) {
    this.searchPosts();
  }

  searchPosts() {
    this.http.get(this.baseUrl + 'discussions').subscribe(data => {
      this.posts.next(data);
    })
  }

  getQuestionById(postId: any): Observable<any> {
    return this.posts$.pipe(map<any[], any>(posts => {
      return posts.filter(item => item.postId == postId)
    }))
  }

  createPost(request: any): void {
    this.http.post(this.baseUrl + 'discussions', request).subscribe(data => {
      this.searchPosts();
    });
  }

  updatePost(request: any, id: number) {
    this.http.put(this.baseUrl + 'discussions/' + id, request).subscribe(data => {
      this.searchPosts();
    })
  }

  updateVote(request: any): void {
    const posts = [...this.posts.value]
    posts.forEach(item => {
      if (item.postId == request.postId) {
        item.replyPosts.forEach(e => {
          if (e.postId == request.threadId) {
            if (request.like) {
              e.likeCount += 1;
            } else {
              e.disLikeCount += 1;
            }
          }
        })
      }
    });
    this.posts.next(posts);
  }
}
