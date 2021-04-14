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
        subject: this.title,
        postDescription: this.reply.content[0].content[0].text,
        likeCount: 0,
        dislikeCount: 0,
        createdBy: "Code Owner",
        createdOn: this.DateConverter(),
        lastUpdatedOn: "2021-04-14 10:00:00"
      }
    }
    this.discussionService.createPost(request);
    this.title = '';
    this.reply = '';
  }
    DateConverter() {
    let now = new Date();
    let year = "" + now.getFullYear();
    let month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
    let day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
    let hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
    let minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
    let second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
    return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
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
    this.reply= toDoc(this.reply);
    
    this.createPost();
    console.log(this.reply);
    
  }
  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
