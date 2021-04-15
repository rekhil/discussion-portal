import { Component, Input, OnInit } from '@angular/core';
import { DiscussionService } from '../services/discussion.service';
import { Editor, toHTML, toDoc } from 'ngx-editor';

@Component({
  selector: 'ngx-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() thread: any;
  @Input() parentPostId: number;
  showChildNodes: boolean;
  showEditor: boolean;
  editor: Editor;
  title: string;
  reply: string;

  constructor(private discussionService: DiscussionService) { }

  ngOnInit(): void {
    this.editor = new Editor();
  }

  vote(like: boolean, threadId: any) {
    const request = {
      isLike: like,
      userName: 'Code Owner',
      discussionPostId: threadId
    }
    this.discussionService.updateVote(request);
  }

  replyQuestion() {
    const request = {
      subject: this.title,
      postDescription: this.reply,
      tags: [],
      isTopic: false,
      createdBy: "Code Owner",
      parentPostId: this.thread.postId
    };
    this.discussionService.createPost(request).subscribe(response => {
      if (response.isSuccess) {

      }
    });
  }

  toggle() {
    this.showChildNodes = !this.showChildNodes;
    this.editor = new Editor();
  }
}
