import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DiscussionService } from '../services/discussion.service';

@Component({
  selector: 'app-discussions',
  templateUrl: './discussions.component.html',
  styleUrls: ['./discussions.component.scss']
})
export class DiscussionsComponent implements OnInit {

  public posts: any[];

  constructor(private discussionService: DiscussionService, private router: Router) { }

  ngOnInit(): void {
    this.discussionService.posts$.subscribe(data => {
      this.posts = data;
    })
  }

  goToDetails(postId: any) {
    this.router.navigate([`/discussions/${postId}`]);
  }

  askQuestion() {
    this.router.navigate([`/discussions/post/new`]);
  }

}
