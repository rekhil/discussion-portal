import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router'
import { DiscussionService } from '../services/discussion.service';
import { Editor, toHTML, toDoc } from 'ngx-editor';

@Component({
  selector: 'ngx-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  id: any;
  post: any;
  postDescription: string;
  title: string;
  editor: Editor;
  reply;

  constructor(private route: ActivatedRoute, private discussionService: DiscussionService) { }

  ngOnInit(): void {
    this.editor = new Editor();
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      this.discussionService.getQuestionById(this.id).subscribe(data => {
        this.post = data[0];
      });
    });
  }

  createPost() {
    const request = {
      id: this.id,
      post: {
        id: 11,
        subject: this.postDescription,
        postDescription: this.postDescription,
        likeCount: 0,
        dislikeCount: 0,
        createdBy: "Code Owner",
        createdOn: "2021-04-14 10:00:00",
        lastUpdatedOn: "2021-04-14 10:00:00"
      }
    }
    this.discussionService.createPost(request);
    this.postDescription = '';
  }

  vote(like: boolean, threadId: any) {
    const request = {
      like: like,
      threadId: threadId,
      id: this.id
    }
    this.discussionService.updateVote(request);
  }
  replyQuestion(){
    console.log(this.reply.content[0].content[0].text,this.title);
  }
  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
