import { DOCUMENT } from "@angular/common";
import { Component, Inject, Input, OnInit } from "@angular/core";
import { DiscussionService } from "../services/discussion.service";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.scss"],
})
export class PostComponent implements OnInit {
  @Input() thread: any;
  @Input() parentPostId: number;
  showChildNodes: boolean;
  showEditor: boolean;
  title: string;
  reply: string;
  private _document?: Document;

  constructor(
    private discussionService: DiscussionService,
    @Inject(DOCUMENT) private document: any
  ) {
    this._document = document as Document;
  }

  ngOnInit(): void {}

  vote(like: boolean, threadId: any) {
    const request = {
      isLike: like,
      userName: "Code Owner",
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
      createdBy: "Code Owner",
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
  }

  refreshPage() {
    this._document.defaultView.location.reload();
  }
}