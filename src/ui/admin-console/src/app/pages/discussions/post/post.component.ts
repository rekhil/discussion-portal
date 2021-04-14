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
  editor: Editor;
  title: string;

  constructor(private discussionService: DiscussionService) { }

  ngOnInit(): void {
    console.log(this.thread);
    
  }

  vote(like: boolean, threadId: any) {
    const request = {
      like: like,
      threadId: threadId,
      postId: this.parentPostId
    }
    this.discussionService.updateVote(request);
  }
  replyQuestion() {
    
  }
  toogle() {
    this.editor = new Editor();
  }
}
