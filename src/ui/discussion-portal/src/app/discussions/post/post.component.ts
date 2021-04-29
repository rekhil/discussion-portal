import { DOCUMENT } from '@angular/common';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { DiscussionService } from '../services/discussion.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() thread: any;
  @Input() parentPostId: number;
  @Output() refreshDetails = new EventEmitter();
  showChildNodes: boolean;
  showEditor: boolean;
  title: string;
  reply: string;
  likedByCurrentUser: boolean;
  dislikedByCurrentUser: boolean;
  currentUser: string;
  editable: boolean;
  openEdit: boolean;
  editedReply: string;

  constructor(
    private discussionService: DiscussionService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.username;
    this.editable = this.currentUser === this.thread.createdBy;
    this.editedReply = this.editable ? this.thread.postDescription : '';
    this.likedByCurrentUser =
      this.thread.likedUsers?.findIndex((user) => user === this.currentUser) >
      -1;
    this.dislikedByCurrentUser =
      this.thread.disLikedUsers?.findIndex(
        (user) => user === this.currentUser
      ) > -1;
  }

  vote(like: boolean, threadId: any) {
    const request = {
      isLike: like,
      userName: 'stg',
      discussionPostId: threadId,
    };
    this.discussionService.updateVote(request).subscribe((response) => {
      if (response.isSuccess) {
        this.refreshDetails.emit();
      }
    });
  }

  replyQuestion() {
    const request = {
      subject: this.title,
      postDescription: this.reply,
      tags: [],
      isTopic: false,
      createdBy: this.authService.username,
      parentPostId: this.thread.postId,
    };
    this.discussionService.createPost(request).subscribe((response) => {
      if (response.isSuccess) {
        this.refreshDetails.emit();
      }
    });
  }

  updateReply() {
    this.openEdit = false;
    const request = {
      subject: this.title,
      postDescription: this.editedReply,
      tags: [],
      isTopic: false,
      createdBy: this.authService.username,
      parentPostId: this.thread.postId,
    };
    this.discussionService.createPost(request).subscribe((response) => {
      if (response.isSuccess) {
        this.refreshDetails.emit();
      }
    });
  }

  openEditor(value) {
    this.openEdit = value;
  }

  toggle() {
    this.showChildNodes = !this.showChildNodes;
  }

  refreshPostDetails() {
    this.refreshDetails.emit();
  }
}
