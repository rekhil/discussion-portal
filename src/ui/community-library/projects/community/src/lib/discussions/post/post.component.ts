import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { DiscussionService } from '../services/discussion.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

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
  currentUser: any;
  editable: boolean;
  openEdit: boolean;
  editedReply: string;
  postId;
  constructor(
    private discussionService: DiscussionService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(window.localStorage.getItem('discussion@profile'));
    this.editable = this.currentUser.userName === this.thread.createdBy;
    this.editedReply = this.editable ? this.thread.postDescription : '';
    this.likedByCurrentUser =
      (this.thread.likedUsers) ? (this.thread.likedUsers.findIndex((user) => user === this.currentUser.userName) >
        -1) : false;
    this.dislikedByCurrentUser =
      (this.thread.disLikedUsers) ? (this.thread.disLikedUsers.findIndex(
        (user) => user === this.currentUser.userName
      ) > -1) : false;
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.postId = params.get('postId');
      });
  }

  vote(like: boolean, threadId: any) {
    const request = {
      isLike: like,
      userName: this.currentUser.userName,
      discussionPostId: threadId
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
      createdBy: this.currentUser.userName,
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
      createdBy: this.currentUser.userName,
      parentPostId: this.thread.postId,
    };
    this.discussionService.updatePost(request,this.postId).subscribe((response) => {
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
