import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router'
import { DiscussionService } from '../services/discussion.service';
import { Editor, toHTML, toDoc } from 'ngx-editor';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  postId: any;
  post: any;
  postDescription: string;
  editor: Editor;
  reply;

  constructor(private route: ActivatedRoute, private discussionService: DiscussionService,
    private router: Router) { }

  ngOnInit(): void {
    this.editor = new Editor();
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.postId = params.get('postId');
      this.getPostDetails(this.postId);
    });
  }

  getPostDetails(postId) {
    this.discussionService.getQuestionById(postId).subscribe(data => {
      this.post = data;
      this.reply = '';
    });
  }

  createPost() {
    const request = {
      subject: this.post.subject,
      postDescription: this.reply,
      tags: [],
      isTopic: false,
      createdBy: "Code Owner",
      parentPostId: this.postId
    };
    this.discussionService.createPost(request).subscribe(response => {
      if (response.isSuccess) {
        this.getPostDetails(this.postId);
      }
    });
    this.postDescription = '';
  }

  vote(like: boolean, threadId: any) {
    const request = {
      like: like,
      threadId: threadId,
      postId: this.postId
    }
    this.discussionService.updateVote(request);
  }

  replyQuestion() {
    this.createPost();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
