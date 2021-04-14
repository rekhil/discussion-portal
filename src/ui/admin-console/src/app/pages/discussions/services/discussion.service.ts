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

  constructor(private http: HttpClient) {
    this.searchPosts();
  }

  searchPosts() {
    this.http.get('assets/data/posts.json').subscribe(data => {
      this.posts.next(data);
    })
  }

  getQuestionById(postId: any): Observable<any> {
    return this.posts$.pipe(map<any[], any>(posts => {
      return posts.filter(item => item.id == postId)
    }))
  }

  createPost(request: any): void {
    const posts = [...this.posts.value]
    posts.forEach(item => {
      if (item.id == request.id) {
        item.replyPosts.push(request.post)
      }
    });
    this.posts.next(posts);
  }

  updateVote(request: any): void {
    const posts = [...this.posts.value]
    posts.forEach(item => {
      if (item.id == request.id) {
        item.replyPosts.forEach(e => {
          if (e.id == request.threadId) {
            if (request.like) {
              e.likeCount += 1;
            } else {
              e.dislikeCount += 1;
            }
          }
        })
      }
    });
    this.posts.next(posts);
  }
}
