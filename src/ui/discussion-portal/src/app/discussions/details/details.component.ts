import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Config } from 'src/app/shared/config';
import { DiscussionService } from '../services/discussion.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  postId: any;
  post: any;
  postDescription: string;
  reply;
  likedByCurrentUser: boolean;
  dislikedByCurrentUser: boolean;
  currentUser: string;
  showLoader: boolean;
  topicEdit: boolean;

  constructor(
    private route: ActivatedRoute,
    private discussionService: DiscussionService,
    public authService: AuthService,
    private location: Location
  ) {}

  ngOnInit(): void {
    // this.currentUser = this.authService.username;
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.postId = params.get('postId');
      this.getPostDetails();
    });
  }

  getPostDetails() {
    this.showLoader = true;
    this.discussionService.getQuestionById(this.postId).subscribe(
      (data) => {
        this.post = data;
        this.likedByCurrentUser =
          this.post.likedUsers?.findIndex(
            (user) => user === this.authService.username
          ) > -1;
        this.dislikedByCurrentUser =
          this.post.disLikedUsers?.findIndex(
            (user) => user === this.authService.username
          ) > -1;
        this.reply = '';
        this.showLoader = false;
      },
      () => {
        this.showLoader = false;
      }
    );
  }

  createPost() {
    const request = {
      subject: this.post.subject,
      postDescription: this.reply,
      tags: [],
      isTopic: false,
      createdBy: this.authService.username,
      parentPostId: this.postId,
    };
    this.discussionService.createPost(request).subscribe((response) => {
      if (response.isSuccess) {
        this.getPostDetails();
      }
    });
    this.postDescription = '';
  }

  goBack() {
    this.location.back();
  }

  vote(like: boolean, threadId: any) {
    const request = {
      isLike: like,
      userName: 'stg',
      discussionPostId: threadId,
    };
    this.discussionService.updateVote(request).subscribe((response) => {
      if (response.isSuccess) {
        this.getPostDetails();
      }
    });
  }

  editTopic() {
    this.topicEdit = true;
  }

  updatePost(details) {
    if (details) {
      const request = {
        ...details,
        parentPostId: this.postId,
      };
      this.discussionService
        .updatePost(request, this.post.postId)
        .subscribe((response) => {
          if (response.isSuccess) {
            this.getPostDetails();
          }
        });
    }
    this.topicEdit = false;
  }

  ngOnDestroy(): void {}
}
