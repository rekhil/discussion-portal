import { Component, OnInit } from '@angular/core';
import { DiscussionService } from '../services/discussion.service';

@Component({
  selector: 'ngx-discussions',
  templateUrl: './discussions.component.html',
  styleUrls: ['./discussions.component.scss']
})
export class DiscussionsComponent implements OnInit {

  public questions: any[];

  constructor(private discussionService: DiscussionService) { }

  ngOnInit(): void {
    this.discussionService.getQuestions().subscribe(data => {
      this.questions = data;
    })
  }

}
