import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { Editor } from 'ngx-editor';
import { DiscussionService } from '../services/discussion.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() thread: any;
  @Input() parentPostId: number;
  showChildNodes: boolean;
  showEditor: boolean;
  editor: Editor;
  title: string;
  reply: string;

  constructor(
    private discussionService: DiscussionService,
    @Inject(DOCUMENT) private _document: Document
  ) {}

  ngOnInit(): void {
    this.editor = new Editor();
  }

  vote(like: boolean, threadId: any) {
    const request = {
      isLike: like,
      userName: 'Code Owner',
      discussionPostId: threadId,
    };
    this.discussionService.updateVote(request).subscribe((response) => {
      if (response.isSuccess) {
        this.refreshPage();
      }
    });
  }

  replyQuestion() {
    const request = {
      subject: this.title,
      postDescription: this.reply,
      tags: [],
      isTopic: false,
      createdBy: 'Code Owner',
      parentPostId: this.thread.postId,
    };
    this.discussionService.createPost(request).subscribe((response) => {
      if (response.isSuccess) {
        this.refreshPage();
      }
    });
  }

  toggle() {
    this.showChildNodes = !this.showChildNodes;
    this.editor = new Editor();
  }

  refreshPage() {
    this._document.defaultView.location.reload();
  }
}
