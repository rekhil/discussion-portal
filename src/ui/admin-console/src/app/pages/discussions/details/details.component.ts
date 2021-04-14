import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router'
import { DiscussionService } from '../services/discussion.service';

@Component({
  selector: 'ngx-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  id: any;
  post: any;
  postDescription: string;

  constructor(private route: ActivatedRoute, private discussionService: DiscussionService) { }

  ngOnInit(): void {
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
        voteCount: 5,
        createdBy: "Code Owner",
        createdOn: "2021-04-14 10:00:00",
        lastUpdatedOn: "2021-04-14 10:00:00"
      }
    }
    this.discussionService.createPost(request);
    this.postDescription = '';
  }

  vote(vote: number, threadId: any) {
    const request = {
      vote: vote,
      threadId: threadId,
      id: this.id
    }
    this.discussionService.updateVote(request);
  }
}
