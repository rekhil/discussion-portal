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
  question: any;
  answer: string;

  constructor(private route: ActivatedRoute, private discussionService: DiscussionService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      this.discussionService.getQuestionById(this.id).subscribe(data => {
        this.question = data[0];
      });
    });
  }

  post() {
    const request = {
      id: this.id,
      answer: {
        id: 11,
        subject: this.answer,
        postDescription: this.answer,
        voteCount: 5,
        createdBy: "Code Owner",
        createdOn: "2021-04-14 10:00:00",
        lastUpdatedOn: "2021-04-14 10:00:00"
      }
    }
    this.discussionService.postAnswer(request);
    this.answer = '';
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
